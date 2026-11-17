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

# [START monitoring_v3_alertpolicyservice_alertpolicy_delete]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.AlertPolicyServiceClient()


def delete_alert_policy(alert_policy_id: str, project_id: str) -> None:
    """Deletes an alert policy from Google Cloud Monitoring.

    Args:
        alert_policy_id: The server-generated ID of the alert policy to delete.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/alertPolicies/{alert_policy_id}"

    try:
        client.delete_alert_policy(name=name)
        print(f"Deleted alert policy: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete alert policy: {exc}")
# [END monitoring_v3_alertpolicyservice_alertpolicy_delete]
