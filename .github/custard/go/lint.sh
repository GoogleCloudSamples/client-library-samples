set -e # Exit on error
set -u # Error when expanding unset variables

PACKAGE="$1"

set -x # Command tracing

cd "$PACKAGE"
time go mod verify
time gofmt -l .
time go build
