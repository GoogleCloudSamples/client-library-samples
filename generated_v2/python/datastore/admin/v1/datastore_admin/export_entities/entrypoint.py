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

from datastoreadmin_entities_export import export_entities

# Support environment variables with optional CLI argument overrides
project_id = os.environ.get("PROJECT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

output_url_prefix = os.environ.get("OUTPUT_URL_PREFIX") or (sys.argv[2] if len(sys.argv) > 2 else None)
if output_url_prefix:
    output_url_prefix = output_url_prefix.strip("'\"")
if not output_url_prefix:
    output_url_prefix = ""


if __name__ == "__main__":
    export_entities(project_id, output_url_prefix)

