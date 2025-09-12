set -e # Exit on error
set -u # Error when expanding unset variables

SCRIPT="$1"
JSON_LIST="$2"

SUCCEEDED=""
FAILED=""
for path in $(echo "$JSON_LIST" | jq -r '.[]'); do
  echo "----- $path -----"
  if bash time $SCRIPT "$path"; then
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
