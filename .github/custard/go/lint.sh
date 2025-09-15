# usage: bash .github/custard/go/lint.sh [path]

set -e # Exit on error
set -u # Error when expanding unset variables

PACKAGE="$1"

set -x # Command tracing

cd "$PACKAGE"
go mod verify
gofmt -l .
go vet
