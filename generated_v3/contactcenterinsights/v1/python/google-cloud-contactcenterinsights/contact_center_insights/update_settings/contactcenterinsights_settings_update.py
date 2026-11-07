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

# [START contactcenterinsights_v1_contactcenterinsights_settings_update]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1
from google.protobuf import field_mask_pb2


def update_settings(project_id: str, location_id: str) -> None:
    """Updates Contact Center Insights settings.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    settings_name = f"projects/{project_id}/locations/{location_id}/settings"
    update_mask = field_mask_pb2.FieldMask(paths=["language_code"])
    settings = contact_center_insights_v1.Settings(
        name=settings_name,
        language_code="en-US",
    )

    try:
        response = client.update_settings(
            settings=settings,
            update_mask=update_mask,
        )
        print(f"Updated settings name: {response.name}")
        print(f"Updated language code: {response.language_code}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Request failed: {exc}")
# [END contactcenterinsights_v1_contactcenterinsights_settings_update]
