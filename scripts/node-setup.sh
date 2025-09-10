# usage: bash scripts/node-setup.sh

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
# The simplest option is having the node_modules and eslintrc in the root
# directory, similar to how Python creates a virtual environment in the
# root directory.

CUSTARD_NODE=".github/custard/node"

# Copy the eslintrc into the root directory, this is in the .gitignore.
cp "$CUSTARD_NODE/.eslintrc" .

# Install the node_modules in the root directory, in the gitignore.
# Using `npm ci`` would require the package.json and lock in the
# root directory, so we just use `npm install`.
npm install --prefix "$(pwd)" "$CUSTARD_NODE"

# This has the side effect of npm creating a package.json and
# package-lock.json in root too.
# They're not needed, so we'll just remove them here to make sure
# nothing ever depends on them and avoid any future issues,
# since npm can be very specific about how packages are structured.
rm package.json package-lock.json
