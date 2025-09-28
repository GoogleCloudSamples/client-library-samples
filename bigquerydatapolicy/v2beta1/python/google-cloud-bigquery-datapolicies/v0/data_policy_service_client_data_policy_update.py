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
from google.protobuf import field_mask_pb2

# [START bigquerydatapolicy_v2beta1_datapolicyservice_update_data_policy]
from google.cloud import bigquery_datapolicies_v2beta1
from google.api_core.exceptions import NotFound

def update_data_policy_sample(
    project_id: str, location: str, data_policy_id: str
) -> None:
    """
    Updates an existing BigQuery Data Policy.

    This sample demonstrates how to update an existing data policy, specifically
    changing its type and masking rule. The `update_mask` is crucial to
    specify which fields of the data policy are being modified.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (e.g., "us").
        data_policy_id: The ID of the data policy to update.
    """
    client = bigquery_datapolicies_v2beta1.DataPolicyServiceClient()

    # Construct the full resource name of the data policy to update.
    # Format: projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}
    data_policy_name = client.data_policy_path(
        project=project_id, location=location, data_policy=data_policy_id
    )

    # Create a DataPolicy object with the desired updates.
    # Here, we're changing the policy type to DATA_MASKING_POLICY
    # and setting a predefined masking expression.
    updated_data_policy = bigquery_datapolicies_v2beta1.DataPolicy(
        name=data_policy_name,
        data_policy_type=bigquery_datapolicies_v2beta1.DataPolicy.DataPolicyType.DATA_MASKING_POLICY,
        data_masking_policy=bigquery_datapolicies_v2beta1.DataMaskingPolicy(
            predefined_expression=bigquery_datapolicies_v2beta1.DataMaskingPolicy.PredefinedExpression.DEFAULT_MASKING_VALUE
        ),
    )

    # Create a FieldMask to specify which fields of the data policy are being updated.
    # Without a field mask, only fields explicitly set in `updated_data_policy`
    # would be considered for update, and others might be ignored or reset.
    # In this case, we are updating the `data_policy_type` and the entire
    # `data_masking_policy` object.
    update_mask = field_mask_pb2.FieldMask(
        paths=["data_policy_type", "data_masking_policy"]
    )

    try:
        response = client.update_data_policy(
            data_policy=updated_data_policy, update_mask=update_mask
        )
        print(f"Successfully updated data policy: {response.name}")
        print(f"Updated Data Policy Type: {response.data_policy_type.name}")
        if response.data_masking_policy:
            print(
                "Updated Data Masking Policy Expression: "
                f"{response.data_masking_policy.predefined_expression.name}"
            )
        else:
            print("No Data Masking Policy set.")

    except NotFound:
        print(
            f"Error: Data policy '{data_policy_name}' not found. "
            "Please ensure the data policy ID and location are correct and the policy exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2beta1_datapolicyservice_update_data_policy]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing BigQuery Data Policy."
    )
    parser.add_argument(
        "project_id",
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "location",
        help="The geographic location of the data policy (e.g., 'us').",
    )
    parser.add_argument(
        "data_policy_id",
        help="The ID of the data policy to update.",
    )
    args = parser.parse_args()

    # Example usage with hardcoded values. Replace with your actual project, location, and data policy ID.
    update_data_policy_sample(
        project_id=args.project_id,
        location=args.location,
        data_policy_id=args.data_policy_id
    )
