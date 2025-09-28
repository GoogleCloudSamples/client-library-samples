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

# [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicies_list]
from google.cloud import bigquery_datapolicies_v2beta1
from google.api_core import exceptions

def list_data_policies_sample(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all data policies in a specified project and location.

    This sample demonstrates how to retrieve a paginated list of data policies
    associated with a given Google Cloud project and location using the
    BigQuery Data Policies API.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The geographic location of the data policies (e.g., "us").
    """
    client = bigquery_datapolicies_v2beta1.DataPolicyServiceClient()

    # Construct the parent resource name.
    # Format: projects/{project_number}/locations/{location_id}
    parent_path = f"projects/{project_id}/locations/{location}"

    try:
        # Make the request to list data policies.
        # The response is a paginated iterable.
        print(f"Listing data policies for project '{project_id}' in location '{location}':")
        page_result = client.list_data_policies(parent=parent_path)

        found_policies = False
        for data_policy in page_result:
            found_policies = True
            print(f"  Data Policy Name: {data_policy.name}")
            print(f"  Data Policy Type: {data_policy.data_policy_type.name}")
            if data_policy.data_masking_policy:
                print(f"  Data Masking Policy: {data_policy.data_masking_policy.predefined_expression.name}")
            if data_policy.grantees:
                print(f"  Grantees: {', '.join(data_policy.grantees)}")
            print("---")

        if not found_policies:
            print(f"No data policies found for project '{project_id}' in location '{location}'.")

    except exceptions.NotFound:
        print(
            f"Error: The specified project '{project_id}' or location '{location}' "
            "was not found or does not exist. Please ensure the project ID and location are correct."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicies_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all data policies in a specified project and location."
    )
    parser.add_argument(
        "project_id",
        help="The ID of the Google Cloud project."
    )
    parser.add_argument(
        "location",
        help="The geographic location of the data policies (e.g., 'us')."
    )
    args = parser.parse_args()

    list_data_policies_sample(
        args.project_id,
        args.location,
    )
