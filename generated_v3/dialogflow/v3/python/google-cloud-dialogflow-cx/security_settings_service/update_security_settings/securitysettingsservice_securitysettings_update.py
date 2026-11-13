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

# [START dialogflow_v3_securitysettingsservice_securitysettings_update]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import dialogflowcx_v3
from google.protobuf import field_mask_pb2


def update_security_settings(
    project_id: str, location_id: str, security_settings_id: str
) -> None:
    """Updates security settings in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID of the security settings (for example,
            'global' or 'us-central1').
        security_settings_id: The server-generated unique identifier of the
            Dialogflow CX security settings to update.
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-dialogflow.googleapis.com")
        if location_id != "global"
        else None
    )
    client = dialogflowcx_v3.SecuritySettingsServiceClient(
        client_options=client_options
    )

    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])
    security_settings = dialogflowcx_v3.SecuritySettings(
        name=(
            f"projects/{project_id}/locations/{location_id}"
            f"/securitySettings/{security_settings_id}"
        ),
        display_name="example-updated-display-name",
    )

    request = dialogflowcx_v3.UpdateSecuritySettingsRequest(
        security_settings=security_settings,
        update_mask=update_mask,
    )

    try:
        response = client.update_security_settings(request=request)
        print(f"Updated security settings: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update security settings: {error}")


# [END dialogflow_v3_securitysettingsservice_securitysettings_update]
