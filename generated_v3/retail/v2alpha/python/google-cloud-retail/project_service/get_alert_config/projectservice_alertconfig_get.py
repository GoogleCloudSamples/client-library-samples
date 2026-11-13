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

# [START retail_v2alpha_projectservice_alertconfig_get]
import google.api_core.exceptions
from google.cloud import retail_v2alpha


def get_alert_config(project_id: str) -> None:
    """Retrieves the alert configuration for a project.

    Args:
        project_id: The Google Cloud project ID hosting the Retail service.
    """
    client = retail_v2alpha.ProjectServiceClient()

    name = f"projects/{project_id}/alertConfig"

    request = retail_v2alpha.GetAlertConfigRequest(name=name)

    try:
        response = client.get_alert_config(request=request)
        print(f"Alert configuration name: {response.name}")
        for recipient in response.alert_policies:
            print(f"Alert policy enrollment: {recipient}")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Cloud Retail terms requirement: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API operation status: {exc}")
# [END retail_v2alpha_projectservice_alertconfig_get]
