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

from tagkeys_namespacedtagkey_get import get_namespaced_tag_key

# Support environment variables with optional CLI argument overrides
parent_id = os.environ.get("PARENT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if parent_id:
    parent_id = parent_id.strip("'\"")
if not parent_id:
    parent_id = ""

tag_key_short_id = os.environ.get("TAG_KEY_SHORT_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if tag_key_short_id:
    tag_key_short_id = tag_key_short_id.strip("'\"")
if not tag_key_short_id:
    tag_key_short_id = ""


if __name__ == "__main__":
    get_namespaced_tag_key(parent_id, tag_key_short_id)

