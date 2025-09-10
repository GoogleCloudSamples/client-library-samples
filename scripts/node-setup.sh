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
# isolated (in .github/custard/<language>), we have limited options:
#   1) Have the eslintrc at the root directory
#       Pros: Simplest option to setup
#       Cons: Not isolated
#   2) Install node_modules in root, and copy eslintrc to root
#       Pros: Simple, isolated (copied files are gitignore'd)
#       Cons: Uncommitted files live in the root directory
#   3) Copy the target package into the .github/custard/node
#       Pros: No need to copy the node_modules (faster)
#       Cons: We must clean up very carefully for the next package (error-prone)
#   4) Copy everything (the target package, eslintrc and node_modules) to a temp directory
#       Pros: Most isolated option, easy to clean up
#       Cons: Slow, running "lint fix" will not actually fix your files

# This is option 2.
#   - Simple and fast to set up
#   - All language-specific files are isolated in .github/custard
#   - Copying the eslintrc does not "break" the repo, and is .gitignore'd
#   - If you "lint fix", it changes the files you expect
#   - Other languages like Python also create the venv in the root
CUSTARD_NODE=".github/custard/node"

cp "$CUSTARD_NODE/.eslintrc" .

# Installing with a prefix like this will create the node_modules in
# the root directory, but it has the side effect of npm creating a
# package.json and package-lock.json in root too.
npm ci --prefix "$(pwd)" "$CUSTARD_NODE"

# They're not needed, so we'll just remove them here to make sure
# nothing ever depends on them and avoid any future issues,
# since npm can be very specific about how packages are structured.
rm package.json
rm package-lock.json
