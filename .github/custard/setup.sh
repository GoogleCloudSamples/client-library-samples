set -e # Exit on error
set -u # Error when expanding unset variables

bash .github/custard/node/setup.sh
bash .github/custard/python/setup.sh
