# usage: bash scripts/python-lint.sh path/to/package
#
# Prerequisites:
# - scripts/python-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables

# Screen clutter, activate venv before `set +x`
source env/bin/activate
set -x # Command tracing

PACKAGE="$1"

FAILED=0

autoflake --check --recursive "$PACKAGE" || FAILED=1
isort --check "$PACKAGE" || FAILED=1
black --check "$PACKAGE" || FAILED=1

if [[ "$FAILED" -ne 0 ]]; then
  echo "One or more check failed." > /dev/null
  exit 1
fi
