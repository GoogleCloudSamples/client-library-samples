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

# [START cloudquotas_v1beta_cloudquotas_quotapreference_get]
import google.api_core.exceptions
from google.cloud import cloudquotas_v1beta

client = cloudquotas_v1beta.CloudQuotasClient()


def get_quota_preference(
    project_id: str, location_id: str, quota_preference_id: str
) -> None:
    """Retrieves the details of a specific quota preference.

    Args:
        project_id: The Google Cloud project ID containing the target quota preference.
        location_id: The location identifier, which must be 'global'.
        quota_preference_id: The identifier of the existing quota preference to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/quotaPreferences/{quota_preference_id}"

    request = cloudquotas_v1beta.GetQuotaPreferenceRequest(name=name)

    try:
        response = client.get_quota_preference(request=request)
        print(f"Quota preference name: {response.name}")
        print(f"Service: {response.service}")
        print(f"Quota ID: {response.quota_id}")
        print(f"Preferred value: {response.quota_config.preferred_value}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")
# [END cloudquotas_v1beta_cloudquotas_quotapreference_get]
