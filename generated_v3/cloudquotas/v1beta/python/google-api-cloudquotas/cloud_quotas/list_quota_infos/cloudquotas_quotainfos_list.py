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

# [START cloudquotas_v1beta_cloudquotas_quotainfos_list]
import os

import google.api_core.exceptions
from google.cloud import cloudquotas_v1beta


def list_quota_infos() -> None:
    """Lists quota info entries for a service.

    Queries Cloud Quotas for quota details and prints the retrieved values.
    """
    client = cloudquotas_v1beta.CloudQuotasClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    parent = f"projects/{project_id}/locations/global/services/compute.googleapis.com"

    request = cloudquotas_v1beta.ListQuotaInfosRequest(
        parent=parent,
    )

    try:
        page_result = client.list_quota_infos(request=request)
        for quota_info in page_result:
            print(f"Quota Info Name: {quota_info.name}")
            print(f"Quota ID: {quota_info.quota_id}")
            print(f"Metric: {quota_info.metric}")
            print(f"Is Precise: {quota_info.is_precise}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list quota infos: {error.message}")
# [END cloudquotas_v1beta_cloudquotas_quotainfos_list]
