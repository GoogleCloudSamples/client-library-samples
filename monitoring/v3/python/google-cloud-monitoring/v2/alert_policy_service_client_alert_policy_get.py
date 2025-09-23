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

# [START monitoring_v3_alertpolicyservice_alertpolicy_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_alert_policy(project_id: str, alert_policy_id: str) -> None:
    """Retrieves a specific alerting policy by its ID.

    Args:
        project_id: The Google Cloud project ID.
        alert_policy_id: The ID of the alert policy to retrieve.
    """
    client = monitoring_v3.AlertPolicyServiceClient()
    name = client.alert_policy_path(project_id, alert_policy_id)

    try:
        response = client.get_alert_policy(name=name)

        print(f"Name: {response.name}")
        print(f"  Display Name: {response.display_name}")
        if response.documentation and response.documentation.content:
            display_content = response.documentation.content
            print(f"  Documentation: {display_content}")
        print(f"  Enabled: {response.enabled}")
        if response.severity:
            print(
                f"  Severity: {monitoring_v3.AlertPolicy.Severity(response.severity).name}"
            )
        if response.user_labels:
            print(f"  User Labels: {response.user_labels}")

    except exceptions.NotFound:
        print(f"Error: Alert policy '{name}' not found.")
        print(
            "Please ensure the project ID and alert policy ID are correct "
            "and that the alert policy actually exists."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(
            "Check your project ID, alert policy ID, and ensure your "
            "service account has the necessary permissions (e.g., Monitoring Viewer)."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Could not retrieve the alert policy. Check your network connection or client configuration."
        )


# [END monitoring_v3_alertpolicyservice_alertpolicy_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific alerting policy by its ID."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--alert_policy_id",
        type=str,
        required=True,
        help="The ID of the alert policy to retrieve.",
    )
    args = parser.parse_args()
    get_alert_policy(project_id=args.project_id, alert_policy_id=args.alert_policy_id)
