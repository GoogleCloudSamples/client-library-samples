# usage: bash scripts/node-lint.sh path/to/package
#
# Prerequisites:
# - scripts/node-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

PACKAGE="$1"
NODE_ENV=".github/custard/node"

npm run --prefix "$NODE_ENV" lint "$(pwd)/$PACKAGE"
