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

from bigtabletableadmin_rowrange_drop import drop_row_range

# Support environment variables with optional CLI argument overrides
project_id = os.environ.get("PROJECT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

instance_id = os.environ.get("INSTANCE_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if instance_id:
    instance_id = instance_id.strip("'\"")
if not instance_id:
    instance_id = ""

table_id = os.environ.get("TABLE_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if table_id:
    table_id = table_id.strip("'\"")
if not table_id:
    table_id = ""

row_key_prefix = os.environ.get("ROW_KEY_PREFIX") or (sys.argv[4] if len(sys.argv) > 4 else None)
if row_key_prefix:
    row_key_prefix = row_key_prefix.strip("'\"")
if not row_key_prefix:
    row_key_prefix = ""


if __name__ == "__main__":
    drop_row_range(project_id, instance_id, table_id, row_key_prefix)

