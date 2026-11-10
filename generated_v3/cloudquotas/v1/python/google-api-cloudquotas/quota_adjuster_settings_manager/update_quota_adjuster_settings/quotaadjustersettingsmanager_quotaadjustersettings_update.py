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

# [START cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_update]
import google.api_core.exceptions
from google.cloud import cloudquotas_v1
from google.protobuf import field_mask_pb2

client = cloudquotas_v1.QuotaAdjusterSettingsManagerClient()


def update_quota_adjuster_settings(project_id: str, location_id: str) -> None:
    """Updates the quota adjuster settings for a project.

    Args:
        project_id: The Google Cloud project ID or number.
        location_id: The location for the quota adjuster settings, which must be 'global'.
    """
    quota_adjuster_settings = cloudquotas_v1.QuotaAdjusterSettings(
        name=f"projects/{project_id}/locations/{location_id}/quotaAdjusterSettings",
        enablement=cloudquotas_v1.QuotaAdjusterSettings.Enablement.ENABLED,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["enablement"])

    try:
        response = client.update_quota_adjuster_settings(
            quota_adjuster_settings=quota_adjuster_settings,
            update_mask=update_mask,
        )
        print(f"Resource name: {response.name}")
        print(f"Enablement status: {response.enablement.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update quota adjuster settings: {error}")
# [END cloudquotas_v1_quotaadjustersettingsmanager_quotaadjustersettings_update]
