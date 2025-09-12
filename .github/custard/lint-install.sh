set -e # Exit on error
set -u # Error when expanding unset variables

bash .github/custard/node/lint-install.sh
bash .github/custard/python/lint-install.sh
