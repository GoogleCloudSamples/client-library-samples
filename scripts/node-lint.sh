# usage: bash scripts/node-lint.sh path/to/package
#
# Prerequisites:
# - scripts/node-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

PACKAGE="$1"
CUSTARD_NODE=".github/custard/node"

npm run --prefix "$CUSTARD_NODE" lint "$(pwd)/$PACKAGE"
