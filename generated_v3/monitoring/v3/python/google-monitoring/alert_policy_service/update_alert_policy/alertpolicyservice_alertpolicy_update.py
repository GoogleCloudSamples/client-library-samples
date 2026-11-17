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

# [START monitoring_v3_alertpolicyservice_alertpolicy_update]
import google.api_core.exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2

client = monitoring_v3.AlertPolicyServiceClient()


def update_alert_policy(project_id: str, alert_policy_id: str) -> None:
    """Updates the display name of an existing alert policy.

    Args:
        project_id: The Google Cloud project ID hosting the alert policy.
        alert_policy_id: The server-generated ID of the alert policy to update.
    """
    alert_policy = monitoring_v3.AlertPolicy(
        name=f"projects/{project_id}/alertPolicies/{alert_policy_id}",
        display_name="Updated Alert Policy",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_alert_policy(
            alert_policy=alert_policy,
            update_mask=update_mask,
        )
        print(f"Updated alert policy: {response.name}")
        print(f"Display name: {response.display_name}")
    except (
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.GoogleAPICallError,
    ) as error:
        print(f"Failed to update alert policy: {error}")
# [END monitoring_v3_alertpolicyservice_alertpolicy_update]
