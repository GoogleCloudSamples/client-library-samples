# usage: bash scripts/python-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

PYTHON_ENV=".github/custard/python"

if [ ! -d "env" ]; then
  python -m venv env
fi

set +x
source env/bin/activate
set -x

pip install --upgrade pip
pip install -r "$PYTHON_ENV/requirements.txt"
pip check
