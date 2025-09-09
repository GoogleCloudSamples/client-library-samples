# usage: bash scripts/node-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

NODE_ENV=".github/custard/node"

npm ci --prefix "$NODE_ENV"
npm audit --prefix "$NODE_ENV"

cp "$NODE_ENV/.eslintrc" .
cp -r "$NODE_ENV/node_modules" .
