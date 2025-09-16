# usage: bash .github/custard/map.sh <script-name> [paths...]

set -e # Exit on error
set -u # Error when expanding unset variables

SCRIPT="$1"
PACKAGES="${@:2}"

SUCCEEDED=""
FAILED=""
for package in $PACKAGES; do
  echo "----- $package -----"
  if bash .github/custard/run.sh "$SCRIPT" "$package"; then
    SUCCEEDED="$SUCCEEDED\n - $package"
  else
    FAILED="$FAILED\n - $package"
  fi
  echo ""
done

echo "===================="
if [[ -n "$SUCCEEDED" ]]; then
  echo -e "✅ Succeeded: $SUCCEEDED\n"
fi

if [[ -n "$FAILED" ]]; then
  echo -e "❌ Failed: $FAILED\n"
  exit 1
fi
