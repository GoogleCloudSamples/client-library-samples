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

from templatesservice_template_launch import launch_template

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

gcs_path = os.environ.get("GCS_PATH") or (sys.argv[3] if len(sys.argv) > 3 else None)
if gcs_path:
    gcs_path = gcs_path.strip("'\"")
if not gcs_path:
    gcs_path = ""

job_name = os.environ.get("JOB_NAME") or (sys.argv[4] if len(sys.argv) > 4 else None)
if job_name:
    job_name = job_name.strip("'\"")
if not job_name:
    job_name = ""


if __name__ == "__main__":
    launch_template(project_id, location_id, gcs_path, job_name)

