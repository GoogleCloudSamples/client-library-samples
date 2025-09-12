set -e # Exit on error
set -u # Error when expanding unset variables

COMMAND="$1"
PACKAGE="$2"

if [ -f "$PACKAGE/package.json" ]; then
  echo "Language: node"
  bash .github/custard/node/$COMMAND.sh "$PACKAGE"
elif [ -f "$PACKAGE/requirements.txt" ]; then
  echo "Language: python"
  bash .github/custard/python/$COMMAND.sh "$PACKAGE"
elif [ -f "$PACKAGE/go.mod" ]; then
  echo "Language: go"
  bash .github/custard/go/$COMMAND.sh "$PACKAGE"
else
  echo "❌ .github/custard/run.sh: package language not supported."
  echo "Could not infer language for '$PACKAGE'"
  echo "No package file found, make sure that path contains one of:"
  echo " - package.json (for Node.js)"
  echo " - requirements.txt (for Python)"
  exit 1
fi
