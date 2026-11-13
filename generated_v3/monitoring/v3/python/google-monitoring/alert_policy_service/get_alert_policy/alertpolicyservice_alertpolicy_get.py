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

# [START monitoring_v3_alertpolicyservice_alertpolicy_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.AlertPolicyServiceClient()


def get_alert_policy(alert_policy_id: str, project_id: str) -> None:
    """Use the get_alert_policy method

    Args:
        alert_policy_id: The server-generated ID of the alert policy.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/alertPolicies/{alert_policy_id}"

    try:
        alert_policy = client.get_alert_policy(name=name)
        print(f"Retrieved alert policy: {alert_policy.display_name}")
        print(f"Policy state: {alert_policy.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END monitoring_v3_alertpolicyservice_alertpolicy_get]
