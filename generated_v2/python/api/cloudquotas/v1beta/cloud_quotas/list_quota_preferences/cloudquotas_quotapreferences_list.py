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

# [START cloudquotas_v1beta_cloudquotas_quotapreferences_list]
import google.api_core.exceptions
from google.cloud import cloudquotas_v1beta

client = cloudquotas_v1beta.CloudQuotasClient()


def list_quota_preferences(project_id: str, location_id: str) -> None:
    """List quota preferences for a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID for the resource container. Cloud Quotas requires this to be 'global'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    request = cloudquotas_v1beta.ListQuotaPreferencesRequest(parent=parent)

    try:
        page_result = client.list_quota_preferences(request=request)
        for quota_preference in page_result:
            print(f"Quota preference name: {quota_preference.name}")
            print(f"Quota ID: {quota_preference.quota_id}")
            print(f"Service: {quota_preference.service}")
            print(f"Preferred value: {quota_preference.quota_config.preferred_value}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list quota preferences: {error}")
# [END cloudquotas_v1beta_cloudquotas_quotapreferences_list]
