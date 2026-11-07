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

from folders_folders_search import search_folders

# Support environment variables with optional CLI argument overrides
query = os.environ.get("QUERY") or (sys.argv[1] if len(sys.argv) > 1 else None)
if query:
    query = query.strip("'\"")
if not query:
    query = ""


if __name__ == "__main__":
    search_folders(query)

