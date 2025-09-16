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

# [START retail_v2alpha_projectservice_alertconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_alert_config(project_id: str) -> None:
    """
    Retrieves the AlertConfig for a given Google Cloud project.

    The AlertConfig defines project-level alert settings for Retail API.
    This method demonstrates how to fetch these settings.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = retail_v2alpha.ProjectServiceClient()

    # The AlertConfig resource name is a singleton resource for a project.
    name = f"projects/{project_id}/alertConfig"

    try:
        request = retail_v2alpha.GetAlertConfigRequest(name=name)
        response = client.get_alert_config(request=request)

        print(f"Successfully retrieved AlertConfig for project {project_id}:")
        print(f"  Name: {response.name}")
        print(f"  Alert Policies:")
        for policy in response.alert_policies:
            print(f"    Alert Group: {policy.alert_group}")
            print(f"    Enroll Status: {policy.enroll_status.name}")
            print(f"    Recipients:")
            for recipient in policy.recipients:
                print(f"      Email: {recipient.email_address}")

        if len(response.alert_policies) == 0:
            print("No Alert Policies found.")

    except exceptions.NotFound:
        print(
            f"AlertConfig not found for project {project_id}. "
            f"Ensure the Retail API is enabled and configured for this project."
        )
    except Exception as e:
        print(f"An error occurred: {e}")
        print(
            "Please check the project number and ensure the Retail API is "
            "properly configured and you have the necessary permissions."
        )


# [END retail_v2alpha_projectservice_alertconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the AlertConfig for a Google Cloud Retail project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID..",
    )
    args = parser.parse_args()

    get_alert_config(args.project_id)
