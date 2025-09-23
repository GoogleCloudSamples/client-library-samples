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

# [START monitoring_v3_alertpolicyservice_alertpolicy_delete]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def delete_alert_policy_sample(project_id: str, alert_policy_id: str) -> None:
    """Deletes an alert policy from a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
        alert_policy_id: The ID of the alert policy to delete.
    """
    client = monitoring_v3.AlertPolicyServiceClient()

    name = client.alert_policy_path(project_id, alert_policy_id)

    try:
        client.delete_alert_policy(name=name)
        print(f"Successfully deleted alert policy: {name}")
    except exceptions.NotFound:
        print(
            f"Alert policy {name} not found. It may have already been deleted or the ID is incorrect."
        )
    except Exception as e:
        print(f"An unexpected error occurred while deleting alert policy {name}: {e}")


# [END monitoring_v3_alertpolicyservice_alertpolicy_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes an alert policy from a Google Cloud project."
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
        help="The ID of the alert policy to delete.",
    )
    args = parser.parse_args()

    delete_alert_policy_sample(
        project_id=args.project_id, alert_policy_id=args.alert_policy_id
    )
