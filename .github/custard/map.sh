set -e # Exit on error
set -u # Error when expanding unset variables

COMMAND="$1"
JSON_LIST="$2"

SUCCEEDED=""
FAILED=""
for path in "${@:1}"; do
  echo "----- $path -----"
  if bash .github/custard/run.sh "$COMMAND" "$path"; then
    SUCCEEDED="$SUCCEEDED\n - $path"
  else
    FAILED="$FAILED\n - $path"
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
