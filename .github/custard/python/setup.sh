# usage: bash .github/custard/python/setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

# The venv directory is in the gitignore.
if [ ! -d "venv" ]; then
  python -m venv venv
fi

venv/bin/python -m pip install --upgrade pip
venv/bin/python -m pip install -r .github/custard/python/requirements.txt
venv/bin/python -m pip check
