# usage: bash .github/custard/python/lint.sh path/to/package
#
# Prerequisites:
# - bash .github/custard/python/lint-install.sh

set -e # Exit on error
set -u # Error when expanding unset variables

PACKAGE="$1"
PYTHON="venv/bin/python"
FAILED=""

set -x # Command tracing
$PYTHON -m autoflake --check --recursive "$PACKAGE" || FAILED="$FAILED\n - autoflake"
$PYTHON -m flake8 "$PACKAGE" || FAILED="$FAILED\n - flake8"
$PYTHON -m black --check "$PACKAGE" || FAILED="$FAILED\n - black"
$PYTHON -m isort --check "$PACKAGE" || FAILED="$FAILED\n - isort"
set +x # Disable command tracing

if [[ -n "$FAILED" ]]; then
  echo -e "\nChecks failed: $FAILED"
  exit 1
fi
