# usage: bash scripts/python-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

CUSTARD_PYTHON=".github/custard/python"

# The venv directory is in the gitignore.
if [ ! -d "venv" ]; then
  python -m venv venv
fi

PYTHON="venv/bin/python"
$PYTHON -m pip install --upgrade pip
$PYTHON -m pip install -r "$CUSTARD_PYTHON/requirements.txt"
$PYTHON -m pip check
