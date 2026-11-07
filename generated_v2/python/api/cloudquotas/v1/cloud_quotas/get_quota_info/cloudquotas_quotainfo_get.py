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

# [START cloudquotas_v1_cloudquotas_quotainfo_get]
import google.api_core.exceptions
from google.cloud import cloudquotas_v1

client = cloudquotas_v1.CloudQuotasClient()


def get_quota_info(
    project_id: str, location_id: str, service_id: str, quota_info_id: str
) -> None:
    """Retrieves quota information for a specified quota identifier.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the quota info. Must be "global".
        service_id: The service name of the quota, such as "compute.googleapis.com".
        quota_info_id: The ID of the quota info (for example, "CpusPerProjectPerRegion").
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/services/"
        f"{service_id}/quotaInfos/{quota_info_id}"
    )

    request = cloudquotas_v1.GetQuotaInfoRequest(name=name)

    try:
        response = client.get_quota_info(request=request)
        print(f"Quota info name: {response.name}")
        print(f"Metric: {response.metric}")
        print(f"Quota display name: {response.quota_display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END cloudquotas_v1_cloudquotas_quotainfo_get]
