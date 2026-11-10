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

# [START cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_get]
import os

import google.api_core.exceptions
from google.cloud import cloudquotas_v1


def get_quota_adjuster_settings() -> None:
    """Retrieves the Quota Adjuster settings for a project."""
    client = cloudquotas_v1.QuotaAdjusterSettingsManagerClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT") or os.environ.get(
        "GCP_PROJECT", "example-project-id"
    )
    name = f"projects/{project_id}/locations/global/quotaAdjusterSettings"

    request = cloudquotas_v1.GetQuotaAdjusterSettingsRequest(
        name=name,
    )

    try:
        response = client.get_quota_adjuster_settings(request=request)
        print(f"Name: {response.name}")
        print(f"Enablement: {response.enablement}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_get]
