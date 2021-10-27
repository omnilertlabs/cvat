# Checkout develop branch first
# Start CVAT
# To start CVAT, navigate to <Your work directory>/cvat and check that docker-compose.override.yml is updated with the images folder you want to share with CVAT:
# - change UI_HOST and CVAT_HOST to the IP address of the host computer
# - change line 10 and line 30 to the path where the images are stored
# - change line 25 to the path where CVAT can store its persistent volume data
#
## Note: for a new cvat install follow: https://github.com/openvinotoolkit/cvat/blob/develop/cvat/apps/documentation/installation.md
## I had to modify several lines in cvat/settings/base.py:
## DATA_UPLOAD_MAX_MEMORY_SIZE = 6000 * 1024 * 1024  # 100 MB
## DATA_UPLOAD_MAX_NUMBER_FIELDS = None   # this django check disabled
## LOCAL_LOAD_MAX_FILES_COUNT = 4500
## LOCAL_LOAD_MAX_FILES_SIZE = 2000 * 1024 * 1024  # 512 MB
# checkout the latest release of cvat:
init_cvat:
	git checkout v1.6.0
# To bring up CVAT, run: `make run_cvat`
# Once all the containers are up, navigate to <host ip>:8080 (may need to update the host ip in the override file)
# CVAT uses the same port as unifi, so you may need to `systemctl stop unifi` first
run_cvat:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.override.yml up -d
#--build

stop_cvat:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.override.yml down

# Nuclear option! Will delete all cvat data!
kill_cvat_containers:
	docker-compose down -v

