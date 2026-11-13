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

# [START monitoring_v3_uptimecheckservice_uptimecheckconfig_create]
import google.api_core.exceptions
from google.cloud import monitoring_v3
from google.protobuf import duration_pb2

client = monitoring_v3.UptimeCheckServiceClient()


def create_uptime_check_config(project_id: str) -> None:
    """Creates an Uptime check configuration in a project.

    Args:
        project_id: The Google Cloud project ID where the Uptime check configuration will be created.
    """
    parent = f"projects/{project_id}"
    uptime_check_config = monitoring_v3.UptimeCheckConfig(
        display_name="Example HTTP Uptime Check",
        monitored_resource={
            "type": "uptime_url",
            "labels": {"host": "example.com"},
        },
        http_check=monitoring_v3.UptimeCheckConfig.HttpCheck(
            path="/",
            port=80,
            request_method=monitoring_v3.UptimeCheckConfig.HttpCheck.RequestMethod.GET,
        ),
        timeout=duration_pb2.Duration(seconds=10),
        period=duration_pb2.Duration(seconds=60),
    )

    try:
        response = client.create_uptime_check_config(
            parent=parent,
            uptime_check_config=uptime_check_config,
        )
        print(f"Created Uptime check configuration: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create Uptime check configuration: {error}")
# [END monitoring_v3_uptimecheckservice_uptimecheckconfig_create]
