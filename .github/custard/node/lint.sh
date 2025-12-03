# usage: bash .github/custard/node/lint.sh [path]

set -e # Exit on error
set -u # Error when expanding unset variables

PACKAGE="$1"

set -x # Command tracing

# Script defined in .github/custard/node/package.json.
npm run lint "$PACKAGE"
