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

# [START monitoring_v3_alertpolicyservice_alertpolicy_update]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2


def update_alert_policy_sample(project_id: str, alert_policy_id: str) -> None:
    """
    Updates an existing alert policy's display name.

    Args:
        project_id: The Google Cloud project ID.
        alert_policy_id: The ID of the alert policy to update.
    """
    client = monitoring_v3.AlertPolicyServiceClient()
    policy_name = client.alert_policy_path(project_id, alert_policy_id)

    try:
        existing_policy = client.get_alert_policy(name=policy_name)
        print(f"Retrieved existing alert policy: '{existing_policy.display_name}'")

        new_display_name = f"{existing_policy.display_name} - Updated"
        existing_policy.display_name = new_display_name

        update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

        updated_policy = client.update_alert_policy(
            alert_policy=existing_policy, update_mask=update_mask
        )

        print(f"Successfully updated alert policy: '{updated_policy.name}'")
        print(f"New display name: '{updated_policy.display_name}'")

    except exceptions.NotFound:
        print(
            f"Error: Alert policy '{policy_name}' not found. "
            "Please ensure the alert policy ID is correct and exists in the project."
        )
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided. Details: {e}")
        print("Please check the format of project_id and alert_policy_id.")
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied to access alert policy '{policy_name}'. "
            "Ensure the service account has 'Monitoring Editor' or equivalent permissions."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_alertpolicyservice_alertpolicy_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Google Cloud Monitoring alert policy."
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
        help=("The ID of the alert policy to update"),
    )

    args = parser.parse_args()

    update_alert_policy_sample(args.project_id, args.alert_policy_id)
