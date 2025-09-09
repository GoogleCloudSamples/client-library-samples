# usage: bash scripts/node-setup.sh

set -e # Exit on error
set -u # Error when expanding unset variables
set -x # Command tracing

NODE_ENV=".github/custard/node"

npm ci --prefix "$NODE_ENV"
npm audit --prefix "$NODE_ENV"

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
#   2) Copy the eslintrc along with node_modules to the root directory
#       Pros: Simple, isolated (copied files are gitignore'd)
#       Cons: Takes 1-2 seconds to copy the node_modules
#   3) Copy the target package into the .github/custard/node
#       Pros: No need to copy the node_modules (faster)
#       Cons: We must clean up very carefully for the next package (error-prone)
#   4) Copy everything (the target package, eslintrc and node_modules) to a temp directory
#       Pros: Most isolated option, easy to clean up
#       Cons: Slow, running "lint fix" will not actually fix your files

# This is option 2.
#   - Simple to set up (although it takes 1-2 seconds, but only once)
#   - All language-specific files are isolated in .github/custard
#   - Copying files does not "break" the repo, and .gitignore'd
#   - If you "lint fix", it changes the files you expect
cp "$NODE_ENV/.eslintrc" .
cp -r "$NODE_ENV/node_modules" .
