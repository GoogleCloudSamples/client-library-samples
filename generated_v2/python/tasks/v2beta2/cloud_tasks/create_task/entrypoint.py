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

from cloudtasks_task_create import create_task

# Support environment variables with optional CLI argument overrides
project_id = os.environ.get("PROJECT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

location_id = os.environ.get("LOCATION_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if location_id:
    location_id = location_id.strip("'\"")
if not location_id:
    location_id = ""

queue_id = os.environ.get("QUEUE_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if queue_id:
    queue_id = queue_id.strip("'\"")
if not queue_id:
    queue_id = ""

response_id = os.environ.get("RESPONSE_ID") or (sys.argv[4] if len(sys.argv) > 4 else None)
if response_id:
    response_id = response_id.strip("'\"")
if not response_id:
    response_id = ""

schedule_time_id = os.environ.get("SCHEDULE_TIME_ID") or (sys.argv[5] if len(sys.argv) > 5 else None)
if schedule_time_id:
    schedule_time_id = schedule_time_id.strip("'\"")
if not schedule_time_id:
    schedule_time_id = ""

already_exists_id = os.environ.get("ALREADY_EXISTS_ID") or (sys.argv[6] if len(sys.argv) > 6 else None)
if already_exists_id:
    already_exists_id = already_exists_id.strip("'\"")
if not already_exists_id:
    already_exists_id = ""

create_task_id = os.environ.get("CREATE_TASK_ID") or (sys.argv[7] if len(sys.argv) > 7 else None)
if create_task_id:
    create_task_id = create_task_id.strip("'\"")
if not create_task_id:
    create_task_id = ""


if __name__ == "__main__":
    create_task(project_id, location_id, queue_id, response_id, schedule_time_id, already_exists_id, create_task_id)

