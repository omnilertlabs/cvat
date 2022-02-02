# Checkout develop branch first
# Start CVAT
# To start CVAT, navigate to <Your work directory>/cvat and check that docker-compose.override.yml is updated with the images folder you want to share with CVAT:
# - change line 6 and line 19 to the path where the images are stored
# - change line 14 to the path where CVAT can store its persistent volume data
#
## Note: for a new cvat install follow: https://openvinotoolkit.github.io/cvat/docs/administration/basics/installation/
## I had to modify several lines in cvat/settings/base.py:
## DATA_UPLOAD_MAX_MEMORY_SIZE = 6000 * 1024 * 1024  # 100 MB
## DATA_UPLOAD_MAX_NUMBER_FIELDS = None   # this django check disabled
## LOCAL_LOAD_MAX_FILES_COUNT = 4500
## LOCAL_LOAD_MAX_FILES_SIZE = 2000 * 1024 * 1024  # 512 MB

# IMPORTANT: Set the environment variable for the public IP of the local machine:
# export CVAT_HOST=10.2.10.59

# checkout the latest release of cvat:
init_cvat:
	git checkout main
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.override.yml build

# To bring up CVAT, run: `make run_cvat`
# Once all the containers are up, navigate to <host ip>:8080 (remember to export the CVAT_HOST variable with your current IP address)

run_cvat:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.override.yml up -d

stop_cvat:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.override.yml down

# Nuclear option! Will delete all cvat data!
kill_cvat_containers:
	docker-compose down -v

# if CVAT has never been run on this machine, you'll need to create an admin user:
create_adminuser:
	docker exec -it cvat bash -ic 'python3 ~/manage.py createsuperuser'

