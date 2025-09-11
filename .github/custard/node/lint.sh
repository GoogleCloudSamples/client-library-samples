# usage: bash .github/custard/node/lint.sh path/to/package
#
# Prerequisites:
# - bash .github/custard/node/setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

PACKAGE="$1"

# Script defined in .github/custard/node/package.json.
npm run lint "$PACKAGE"
