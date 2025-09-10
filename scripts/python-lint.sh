# usage: bash scripts/python-lint.sh path/to/package
#
# Prerequisites:
# - scripts/python-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

PACKAGE="$1"

FAILED=0
PYTHON="venv/bin/python"
$PYTHON -m autoflake --check --recursive "$PACKAGE" || FAILED=1
$PYTHON -m isort --check "$PACKAGE" || FAILED=1
$PYTHON -m black --check "$PACKAGE" || FAILED=1

if [[ "$FAILED" -ne 0 ]]; then
  echo "One or more checks failed." > /dev/null
  exit 1
fi
