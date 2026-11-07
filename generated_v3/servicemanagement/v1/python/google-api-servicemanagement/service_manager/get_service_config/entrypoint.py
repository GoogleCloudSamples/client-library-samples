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

from servicemanager_serviceconfig_get import get_service_config

# Support environment variables with optional CLI argument overrides
config_id = os.environ.get("CONFIG_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if config_id:
    config_id = config_id.strip("'\"")
if not config_id:
    config_id = ""

service_name = os.environ.get("SERVICE_NAME") or (sys.argv[2] if len(sys.argv) > 2 else None)
if service_name:
    service_name = service_name.strip("'\"")
if not service_name:
    service_name = ""


if __name__ == "__main__":
    get_service_config(config_id, service_name)

