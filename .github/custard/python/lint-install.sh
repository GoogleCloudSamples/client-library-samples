# usage: bash .github/custard/python/lint-install.sh

set -e # Exit on error
set -u # Error when expanding unset variables

CUSTARD_PYTHON=".github/custard/python"
PYTHON="venv/bin/python"

set -x # Command tracing

# The venv directory is in the gitignore.
if [ ! -d "venv" ]; then
  python -m venv venv
fi

$PYTHON -m pip install --upgrade pip
$PYTHON -m pip install -r "$CUSTARD_PYTHON/requirements.txt"
$PYTHON -m pip check
