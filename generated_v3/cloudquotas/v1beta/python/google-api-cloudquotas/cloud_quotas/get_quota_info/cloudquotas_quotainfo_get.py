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

# [START cloudquotas_v1beta_cloudquotas_quotainfo_get]
import os

import google.api_core.exceptions
from google.cloud import cloudquotas_v1beta


def get_quota_info() -> None:
    """Retrieve quota information for a specific service."""
    client = cloudquotas_v1beta.CloudQuotasClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    name = (
        f"projects/{project_id}/locations/global/services/"
        "compute.googleapis.com/quotaInfos/CPUS-per-project-region"
    )

    request = cloudquotas_v1beta.GetQuotaInfoRequest(
        name=name,
    )

    try:
        response = client.get_quota_info(request=request)
        print(f"Quota Name: {response.name}")
        print(f"Quota ID: {response.quota_id}")
        print(f"Metric: {response.metric}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve quota info: {error}")
# [END cloudquotas_v1beta_cloudquotas_quotainfo_get]
