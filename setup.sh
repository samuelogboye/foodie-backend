#!/bin/bash
echo "=========================================================================================="
echo "Welcome to the setup. This script creates a virtual environment venv in the current"
echo "working directory, installs all the necessary packages into it, and runs the application."
echo "The environment is deactivated and deleted and the cache files and the database file is "
echo "deleted as soon as the server is stopped. Thus, this script can be run multiple times" 
echo "without any conflict."
echo "=========================================================================================="
echo "Creating environment..."
python3 -m venv venv
echo "Creating database directory"
echo "Enabling environment and installing necessary libraries..."
. venv/bin/activate;
pip install --upgrade -r requirements.txt
gunicorn -w 4 -b 0.0.0.0:5000 run:app --access-logfile access_log.log --error-logfile error_log.log
echo "Deactivating environment..."
deactivate
echo "Removing environment..."
rm -r venv
if [ -e __pycache__ ]; then
    echo "Removing __pycache__ ..."
    rm -r __pycache__
fi