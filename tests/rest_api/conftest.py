# Copyright (C) 2021 Intel Corporation
#
# SPDX-License-Identifier: MIT

from subprocess import run, CalledProcessError
import pytest
import json
import os.path as osp
from .utils.config import ASSETS_DIR

def cvat_db_container(command):
    run(('docker exec cvat_db ' + command).split(), check=True) #nosec

def docker_cp(source, target):
    run(' '.join(['docker container cp', source, target]).split(), check=True) #nosec

def restore_data_volume():
    command = 'docker run --rm --volumes-from cvat --mount ' \
        f'type=bind,source={ASSETS_DIR},target=/mnt/ ubuntu tar ' \
        '--strip 3 -C /home/django/data -xjf /mnt/cvat_data.tar.bz2'
    run(command.split(), check=True) #nosec

def drop_test_db():
    cvat_db_container('pg_restore -c -U root -d cvat /cvat_db/cvat_db.dump')
    cvat_db_container('rm -rf /cvat_db')
    cvat_db_container('dropdb test_db')

def create_test_db():
    docker_cp(source=osp.join(ASSETS_DIR, 'cvat_db'), target='cvat_db:/')
    cvat_db_container('createdb test_db')
    cvat_db_container('pg_restore -U root -d test_db /cvat_db/cvat_db.dump')

@pytest.fixture(scope='session', autouse=True)
def init_test_db():
    try:
        restore_data_volume()
        create_test_db()
    except CalledProcessError:
        drop_test_db()
        pytest.exit(f"Cannot to initialize test DB")

    yield

    drop_test_db()

@pytest.fixture(scope='function', autouse=True)
def restore_cvat_db():
    cvat_db_container('psql -U root -d postgres -f /cvat_db/cvat_db.sql')

@pytest.fixture(scope='module')
def users():
    with open(osp.join(ASSETS_DIR, 'users.json')) as f:
        return json.load(f)['results']

@pytest.fixture(scope='module')
def organizations():
    with open(osp.join(ASSETS_DIR, 'organizations.json')) as f:
        data = json.load(f)

    def _organizations(org_id=None):
        if org_id:
            return [org for org in data if org['id'] == org_id][0]
        return data

    return _organizations

@pytest.fixture(scope='module')
def memberships():
    with open(osp.join(ASSETS_DIR, 'memberships.json')) as f:
        return json.load(f)['results']

@pytest.fixture(scope='module')
def users_by_name(users):
    return {user['username']: user for user in users}

@pytest.fixture(scope='module')
def find_users(test_db):
    def find(**kwargs):
        assert len(kwargs) > 0
        assert any(kwargs)

        data = test_db
        kwargs = dict(filter(lambda a: a[1] is not None, kwargs.items()))
        for field, value in kwargs.items():
            if field.startswith('exclude_'):
                field = field.split('_', maxsplit=1)[1]
                exclude_rows = set(v['id'] for v in
                    filter(lambda a: a[field] == value, test_db))
                data = list(filter(lambda a: a['id'] not in exclude_rows, data))
            else:
                data = list(filter(lambda a: a[field] == value, data))

        return data
    return find


@pytest.fixture(scope='module')
def test_db(users, users_by_name, memberships):
    data = []
    fields = ['username', 'id', 'privilege', 'role', 'org', 'membership_id']
    def add_row(**kwargs):
        data.append({field: kwargs.get(field) for field in fields})

    for user in users:
        for group in user['groups']:
            add_row(username=user['username'], id=user['id'], privilege=group)

    for membership in memberships:
        username = membership['user']['username']
        for group in users_by_name[username]['groups']:
            add_row(username=username, role=membership['role'], privilege=group,
                id=membership['user']['id'], org=membership['organization'],
                membership_id=membership['id'])

    return data




