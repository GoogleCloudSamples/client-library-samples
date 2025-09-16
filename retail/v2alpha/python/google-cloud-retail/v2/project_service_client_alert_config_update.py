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

# [START retail_v2alpha_projectservice_alertconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_alert_config(
    project_id: str,
) -> None:
    """
    Updates the AlertConfig for a given Google Cloud project.

    The AlertConfig allows you to configure alert policies for various Retail API
    features, such as data quality issues for search. This sample demonstrates
    how to update the alert policies for the 'search-data-quality' alert group.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = retail_v2alpha.ProjectServiceClient()

    # Construct the full resource name for the alert config
    alert_config_name = f"projects/{project_id}/alertConfig"

    # Define the alert policy to update or create
    # For this example, we're updating the 'search-data-quality' alert group
    # to be enrolled and send alerts to a specific email address.
    new_alert_policy = retail_v2alpha.AlertConfig.AlertPolicy(
        alert_group="search-data-quality",
        enroll_status=retail_v2alpha.AlertConfig.AlertPolicy.EnrollStatus.ENROLLED,
        recipients=[
            retail_v2alpha.AlertConfig.AlertPolicy.Recipient(
                email_address="retail-alerts@example.com"
            )
        ],
    )

    # Create an AlertConfig object with the name and the new alert policies.
    # The name is required for the update operation.
    alert_config = retail_v2alpha.AlertConfig(
        name=alert_config_name,
        alert_policies=[new_alert_policy],
    )

    # Specify which fields of the AlertConfig are being updated.
    # In this case, we are only updating the 'alert_policies' field.
    update_mask = field_mask_pb2.FieldMask(paths=["alert_policies"])

    request = retail_v2alpha.UpdateAlertConfigRequest(
        alert_config=alert_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_alert_config(request=request)

        print("Alert config updated successfully:")
        print(f"  Name: {response.name}")
        for policy in response.alert_policies:
            print(f"  Alert Group: {policy.alert_group}")
            print(f"    Enroll Status: {policy.enroll_status.name}")
            for recipient in policy.recipients:
                print(f"    Recipient Email: {recipient.email_address}")

    except exceptions.NotFound as e:
        print(
            f"Error: AlertConfig not found for project {project_id}. "
            f"Please ensure the project number is correct and the Retail API is enabled. "
            f"Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_projectservice_alertconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update the AlertConfig for a Google Cloud Retail project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    args = parser.parse_args()

    update_alert_config(args.project_id)
