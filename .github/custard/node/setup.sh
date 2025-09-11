# usage: bash .github/custard/node/setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

# Eslint and gts are very specific about how and where they want the eslintrc
# file and the node_modules/ to live.
# They will first try to find it in the target package we're trying to lint,
# rather than looking at where the package.json with the lint script is defined.
# If they don't find it, they'll look on parent directories until
# they find an eslintrc file.
# Additionally, it expects the gts config to live within the node_modules,
# and it looks for it relative to the target package's directory, not relative
# to the locaiton of the eslintrc.
# This means that if we want to keep the language-specific configurations
# isolated (in .github/custard/<language>), we have limited options.
#
# The simplest option is copying the package files and installing into the
# root directory, similar to how Python creates a virtual environment
# in the root directory.

CUSTARD_NODE=".github/custard/node"

# Copy the Node package files to the root directory.
cp "$CUSTARD_NODE/.eslintrc" .
cp "$CUSTARD_NODE/package.json" .
cp "$CUSTARD_NODE/package-lock.json" .

# Install in root to make it available to all subpackages.
npm ci
