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

from binauthzmanagementservicev1beta1_attestor_update import update_attestor

# Support environment variables with optional CLI argument overrides
project_id = os.environ.get("PROJECT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

attestor_id = os.environ.get("ATTESTOR_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if attestor_id:
    attestor_id = attestor_id.strip("'\"")
if not attestor_id:
    attestor_id = ""


if __name__ == "__main__":
    update_attestor(project_id, attestor_id)

