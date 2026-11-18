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

# [START dialogflow_v3_securitysettingsservice_securitysettings_delete]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def delete_security_settings(
    project_id: str, location_id: str, security_settings_id: str
) -> None:
    """Deletes a security settings resource.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the security settings
          reside (for example, 'us-central1').
        security_settings_id: The server-generated identifier of the security
          settings to delete.
    """
    if location_id and location_id != "global":
        client = dialogflowcx_v3.SecuritySettingsServiceClient(
            client_options={
                "api_endpoint": f"{location_id}-dialogflow.googleapis.com"
            }
        )
    else:
        client = dialogflowcx_v3.SecuritySettingsServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/securitySettings/{security_settings_id}"

    request = dialogflowcx_v3.DeleteSecuritySettingsRequest(
        name=name,
    )

    try:
        client.delete_security_settings(request=request)
        print(f"Deleted security settings: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete security settings: {e}")
# [END dialogflow_v3_securitysettingsservice_securitysettings_delete]
