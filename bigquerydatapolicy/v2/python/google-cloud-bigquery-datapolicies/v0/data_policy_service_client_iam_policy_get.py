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

# [START bigquerydatapolicy_v2_datapolicyservice_iampolicy_get]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2
from google.iam.v1 import iam_policy_pb2  # type: ignore

def get_data_policy_iam_policy(
    project_id: str,
    location: str,
    data_policy_id: str,
) -> None:
    """
    Retrieves the IAM policy for a specific BigQuery Data Policy.

    This function demonstrates how to fetch the Identity and Access Management
    (IAM) policy associated with a given data policy resource. The IAM policy
    defines who has what permissions on the data policy.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (e.g., "us").
        data_policy_id: The ID of the data policy.
    """
    client = bigquery_datapolicies_v2.DataPolicyServiceClient()

    # Construct the full resource name for the data policy.
    # The resource name format is projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}
    resource_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    # Create a GetIamPolicyRequest object.
    request = iam_policy_pb2.GetIamPolicyRequest(resource=resource_name)

    try:
        # Make the request to get the IAM policy.
        policy = client.get_iam_policy(request=request)

        print(f"Successfully retrieved IAM policy for data policy: {resource_name}")
        print("Policy Etag:", policy.etag)
        print("Policy Version:", policy.version)
        if policy.bindings:
            print("Policy Bindings:")
            for binding in policy.bindings:
                print(f"  Role: {binding.role}")
                print(f"  Members: {', '.join(binding.members)}")
                if binding.condition.expression:
                    print(f"  Condition: {binding.condition.expression}")
        else:
            print("No bindings found in the policy.")

    except exceptions.NotFound:
        print(f"Error: Data policy '{resource_name}' not found.")
        print("Please ensure the project ID, location, and data policy ID are correct.")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2_datapolicyservice_iampolicy_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the IAM policy for a BigQuery Data Policy."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us", # Replace with the location of your data policy
        help="The location of the data policy (e.g., 'us', 'europe-west2').",
    )
    parser.add_argument(
        "--data_policy_id",
        type=str,
        required=True,
        help="The ID of the data policy.",
    )

    args = parser.parse_args()

    get_data_policy_iam_policy(args.project_id, args.location, args.data_policy_id)
