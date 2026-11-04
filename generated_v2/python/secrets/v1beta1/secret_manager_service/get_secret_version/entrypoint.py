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

from secretmanagerservice_secretversion_get import get_secret_version

# Support environment variables with optional CLI argument overrides
secret_version_id = os.environ.get("SECRET_VERSION_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if secret_version_id:
    secret_version_id = secret_version_id.strip("'\"")
if not secret_version_id:
    secret_version_id = ""

project_id = os.environ.get("PROJECT_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

secret_id = os.environ.get("SECRET_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if secret_id:
    secret_id = secret_id.strip("'\"")
if not secret_id:
    secret_id = ""


if __name__ == "__main__":
    get_secret_version(secret_version_id, project_id, secret_id)

