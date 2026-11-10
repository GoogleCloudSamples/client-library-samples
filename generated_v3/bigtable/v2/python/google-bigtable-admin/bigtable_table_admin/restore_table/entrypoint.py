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

from bigtabletableadmin_table_restore import restore_table

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

cluster_id = os.environ.get("CLUSTER_ID") or (sys.argv[4] if len(sys.argv) > 4 else None)
if cluster_id:
    cluster_id = cluster_id.strip("'\"")
if not cluster_id:
    cluster_id = ""

backup_id = os.environ.get("BACKUP_ID") or (sys.argv[5] if len(sys.argv) > 5 else None)
if backup_id:
    backup_id = backup_id.strip("'\"")
if not backup_id:
    backup_id = ""


if __name__ == "__main__":
    restore_table(project_id, instance_id, table_id, cluster_id, backup_id)

