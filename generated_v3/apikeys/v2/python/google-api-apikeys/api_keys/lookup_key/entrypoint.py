# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import sys

from apikeys_key_lookup import lookup_key

# Support environment variables with optional CLI argument overrides
key_string = os.environ.get("KEY_STRING") or (sys.argv[1] if len(sys.argv) > 1 else None)
if key_string:
    key_string = key_string.strip("'\"")
if not key_string:
    key_string = ""


if __name__ == "__main__":
    lookup_key(key_string)

