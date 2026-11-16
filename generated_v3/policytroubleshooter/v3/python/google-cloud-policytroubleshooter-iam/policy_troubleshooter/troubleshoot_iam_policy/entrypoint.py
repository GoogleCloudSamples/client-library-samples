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

from policytroubleshooter_troubleshootiampolicy import troubleshoot_iam_policy

# Support environment variables with optional CLI argument overrides
principal = os.environ.get("PRINCIPAL") or (sys.argv[1] if len(sys.argv) > 1 else None)
if principal:
    principal = principal.strip("'\"")
if not principal:
    principal = ""

full_resource_name = os.environ.get("FULL_RESOURCE_NAME") or (sys.argv[2] if len(sys.argv) > 2 else None)
if full_resource_name:
    full_resource_name = full_resource_name.strip("'\"")
if not full_resource_name:
    full_resource_name = ""

permission = os.environ.get("PERMISSION") or (sys.argv[3] if len(sys.argv) > 3 else None)
if permission:
    permission = permission.strip("'\"")
if not permission:
    permission = ""


if __name__ == "__main__":
    troubleshoot_iam_policy(principal, full_resource_name, permission)

