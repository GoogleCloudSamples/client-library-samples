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
import google.api_core.exceptions

# [START bigquerydatapolicy_v2_datapolicyservice_list_data_policies]
from google.cloud import bigquery_datapolicies_v2


def list_data_policies_sample(project_id: str, location: str) -> None:
    """Lists all data policies in a specified project and location.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The geographic location of the data policies (e.g., "us", "us-central1").
    """
    client = bigquery_datapolicies_v2.DataPolicyServiceClient()

    # The parent resource name for which to list data policies.
    # Format: projects/{project_number}/locations/{location_id}
    parent = f"projects/{project_id}/locations/{location}"

    try:
        # Construct the request.
        request = bigquery_datapolicies_v2.ListDataPoliciesRequest(parent=parent)

        # Make the API call and iterate through the response.
        print(f"Listing data policies for project '{project_id}' in location '{location}':")
        page_result = client.list_data_policies(request=request)

        found_policies = False
        for data_policy in page_result:
            found_policies = True
            print(f"  Data Policy Name: {data_policy.name}")
            print(f"  Data Policy ID: {data_policy.data_policy_id}")
            print(f"  Data Policy Type: {data_policy.data_policy_type.name}")
            if data_policy.policy_tag:
                print(f"  Policy Tag: {data_policy.policy_tag}")
            if data_policy.grantees:
                print(f"  Grantees: {', '.join(data_policy.grantees)}")
            print("-" * 20)

        if not found_policies:
            print("No data policies found.")

    except google.api_core.exceptions.NotFound as e:
        print(f"Error: The specified project or location was not found or accessible.")
        print(f"Details: {e}")
        print("Please ensure the project ID and location are correct and you have the necessary permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_list_data_policies]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all data policies in a specified project and location."
    )
    parser.add_argument(
        "project_id",
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "location",
        help="The geographic location of the data policies (e.g., 'us', 'us-central1').",
    )
    args = parser.parse_args()
    list_data_policies_sample(args.project_id, args.location)
