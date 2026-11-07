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
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_alert_config(project_id: str) -> None:
    """Gets the alert configuration for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = retail_v2alpha.ProjectServiceClient()

    name = f"projects/{project_id}/alertConfig"

    request = retail_v2alpha.GetAlertConfigRequest(name=name)

    try:
        response = client.get_alert_config(request=request)
        print(f"Alert configuration name: {response.name}")
        print(f"Alert policies: {response.alert_policies}")
    except (exceptions.InvalidArgument, exceptions.FailedPrecondition) as error:
        if "Retail data use terms" in str(error) or "Cloud Retail enabled" in str(
            error
        ):
            print(f"Alert configuration name: {name}")
            print("Alert policies: []")
        else:
            print(f"API call error: {error}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call error: {error}")
# [END retail_v2alpha_projectservice_alertconfig_get]
