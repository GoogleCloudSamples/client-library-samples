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

from eventarc_enrollment_create import create_enrollment

# Support environment variables with optional CLI argument overrides
enrollment_id = os.environ.get("ENROLLMENT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if enrollment_id:
    enrollment_id = enrollment_id.strip("'\"")
if not enrollment_id:
    enrollment_id = ""

project_id = os.environ.get("PROJECT_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

location_id = os.environ.get("LOCATION_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if location_id:
    location_id = location_id.strip("'\"")
if not location_id:
    location_id = ""

message_bus_id = os.environ.get("MESSAGE_BUS_ID") or (sys.argv[4] if len(sys.argv) > 4 else None)
if message_bus_id:
    message_bus_id = message_bus_id.strip("'\"")
if not message_bus_id:
    message_bus_id = ""


if __name__ == "__main__":
    create_enrollment(enrollment_id, project_id, location_id, message_bus_id)

