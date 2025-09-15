# usage: bash .github/custard/run.sh <script-name> [path]

set -e # Exit on error
set -u # Error when expanding unset variables

SCRIPT="$1"
PACKAGE="$2"

if [ -f "$PACKAGE/package.json" ]; then
  echo "Language: node"
  time bash .github/custard/node/$SCRIPT.sh "$PACKAGE"
elif [ -f "$PACKAGE/requirements.txt" ]; then
  echo "Language: python"
  time bash .github/custard/python/$SCRIPT.sh "$PACKAGE"
elif [ -f "$PACKAGE/go.mod" ]; then
  echo "Language: go"
  time bash .github/custard/go/$SCRIPT.sh "$PACKAGE"
else
  # When adding new languages, remember to update this error message
  # to include the new language's package file.
  echo "❌ .github/custard/run.sh: package language not supported."
  echo "Could not infer language for '$PACKAGE'"
  echo "No package file found, make sure that path contains one of:"
  echo " - package.json (for Node.js)"
  echo " - requirements.txt (for Python)"
  echo " - go.mod (for Go)"
  exit 1
fi
