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

# [START cloudquotas_v1_cloudquotas_quotainfos_list]
import google.api_core.exceptions
from google.cloud import cloudquotas_v1

client = cloudquotas_v1.CloudQuotasClient()


def list_quota_infos(project_id: str, location_id: str, service_id: str) -> None:
    """Lists quota information for a specified service in a project.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID for the Cloud Quotas API, which must be 'global'.
        service_id: The name of the service to list quota information for, for example 'compute.googleapis.com'.
    """
    parent = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    try:
        response = client.list_quota_infos(parent=parent)
        for quota_info in response:
            print(f"Quota name: {quota_info.name}")
            print(f"Metric: {quota_info.metric}")
            print(f"Quota ID: {quota_info.quota_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END cloudquotas_v1_cloudquotas_quotainfos_list]
