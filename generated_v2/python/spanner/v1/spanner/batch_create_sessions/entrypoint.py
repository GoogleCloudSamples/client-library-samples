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

from spanner_batchcreatesessions import batch_create_sessions

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

database_id = os.environ.get("DATABASE_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if database_id:
    database_id = database_id.strip("'\"")
if not database_id:
    database_id = ""


if __name__ == "__main__":
    batch_create_sessions(project_id, instance_id, database_id)

