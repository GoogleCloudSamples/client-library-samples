set -e # Exit on error
set -u # Error when expanding unset variables

SCRIPT="$1"
JSON_LIST="$2"

FAILED=""
for path in $(echo "$JSON_LIST" | jq -r '.[]'); do
  echo "----- $path -----"
  bash "$SCRIPT" "$path" || FAILED="$FAILED\n - $path"
  echo ""
done

echo "===================="
if [[ -n "$FAILED" ]]; then
  echo -e "❌ Failed: $FAILED"
  exit 1
else
  echo "✅ Succeeded"
fi
