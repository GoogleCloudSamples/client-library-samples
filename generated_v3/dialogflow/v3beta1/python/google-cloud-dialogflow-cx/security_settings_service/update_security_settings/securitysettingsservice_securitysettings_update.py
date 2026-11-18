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

# [START dialogflow_v3beta1_securitysettingsservice_securitysettings_update]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1
from google.protobuf import field_mask_pb2


def update_security_settings(
    project_id: str, location_id: str, security_settings_id: str
) -> None:
    """Updates the display name of existing Dialogflow CX security settings.

    Args:
        project_id: The Google Cloud project ID hosting the security settings.
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1').
        security_settings_id: The server-generated ID of the security settings to update.
    """
    if location_id and location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        client = dialogflowcx_v3beta1.SecuritySettingsServiceClient(
            client_options=client_options
        )
    else:
        client = dialogflowcx_v3beta1.SecuritySettingsServiceClient()

    security_settings = dialogflowcx_v3beta1.SecuritySettings(
        name=f"projects/{project_id}/locations/{location_id}/securitySettings/{security_settings_id}",
        display_name="example-updated-security-settings",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_security_settings(
            security_settings=security_settings,
            update_mask=update_mask,
        )
        print(f"Updated security settings name: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"UpdateSecuritySettings request failed: {error}")
# [END dialogflow_v3beta1_securitysettingsservice_securitysettings_update]
