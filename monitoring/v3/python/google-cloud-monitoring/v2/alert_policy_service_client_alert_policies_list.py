# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START monitoring_v3_alertpolicyservice_alertpolicies_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_alert_policies(project_id: str) -> None:
    """
    Lists the existing alerting policies for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.AlertPolicyServiceClient()
    project_name = f"projects/{project_id}"

    try:
        request = monitoring_v3.ListAlertPoliciesRequest(name=project_name)

        page_result = client.list_alert_policies(request=request)

        found_policies = False
        for policy in page_result:
            found_policies = True
            print(f"  Alert Policy Name: {policy.name}")
            print(f"  Conditions: {[c.display_name for c in policy.conditions]}")
            print(f"  Display Name: {policy.display_name}")
            print(f"  Enabled: {policy.enabled}")
            print("  ---")

        if not found_policies:
            print("No alert policies found in this project.")

    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list alert policies due to API error: {e}")
        print(
            "Please ensure the project ID is correct and the service account has the necessary permissions (e.g., Monitoring Viewer)."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_alertpolicyservice_alertpolicies_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists existing alerting policies for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    args = parser.parse_args()
    list_alert_policies(project_id=args.project_id)
