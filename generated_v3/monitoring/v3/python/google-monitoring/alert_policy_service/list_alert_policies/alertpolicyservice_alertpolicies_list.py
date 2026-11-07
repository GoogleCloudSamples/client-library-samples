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

# [START monitoring_v3_alertpolicyservice_alertpolicies_list]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.AlertPolicyServiceClient()


def list_alert_policies(project_id: str) -> None:
    """Lists alert policies for a specified project.

    Args:
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}"

    try:
        request = monitoring_v3.ListAlertPoliciesRequest(name=name)
        alert_policies = client.list_alert_policies(request=request)

        for alert_policy in alert_policies:
            print(
                f"Policy Name: {alert_policy.name}, "
                f"Display Name: {alert_policy.display_name}"
            )
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list alert policies: {error}")
# [END monitoring_v3_alertpolicyservice_alertpolicies_list]
