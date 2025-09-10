# autoflake: Unused imports/variables detected
# flake8: imported but unused
# isort: Imports are incorrectly sorted
import os
import math

# black: would reformat
# flake8: multiple spaces after operator
x = 1 +  2

# flake8: undefined name 'y'
x = y

# Type hint error not caught (needs mypy)
x: int = "hello"
