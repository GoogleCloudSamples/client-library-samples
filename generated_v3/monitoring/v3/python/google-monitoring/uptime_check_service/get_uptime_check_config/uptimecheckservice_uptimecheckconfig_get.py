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

# [START monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.UptimeCheckServiceClient()


def get_uptime_check_config(uptime_check_config_id: str, project_id: str) -> None:
    """Retrieve an Uptime check configuration by identifier.

    Args:
        uptime_check_config_id: The server-generated ID of the Uptime check configuration (for example, 'example-uptime-check-id').
        project_id: The Google Cloud project ID where the Uptime check configuration is located.
    """
    name = f"projects/{project_id}/uptimeCheckConfigs/{uptime_check_config_id}"

    try:
        response = client.get_uptime_check_config(name=name)
        print(f"Retrieved Uptime check configuration: {response.display_name}")
        print(f"Name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
