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

from google.api_core import exceptions
from google.protobuf import field_mask_pb2

# [START bigquerydatapolicy_v2_datapolicyservice_update_data_policy]
from google.cloud import bigquery_datapolicies_v2


def update_data_policy_sample(
    project_id: str,
    location: str,
    data_policy_id: str,
    new_predefined_expression: bigquery_datapolicies_v2.DataMaskingPolicy.PredefinedExpression,
) -> None:
    """
    Updates the metadata for an existing data policy.

    The target data policy can be specified by its resource name.
    This sample updates the predefined masking expression of an existing data masking policy.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location (e.g., "us") of the data policy.
        data_policy_id: The ID of the data policy to update.
        new_predefined_expression: The new predefined masking expression to set.
                                   Must be one of the DataMaskingPolicy.PredefinedExpression enum values.
    """
    client = bigquery_datapolicies_v2.DataPolicyServiceClient()

    # Construct the full resource name for the data policy.
    data_policy_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    # Create a DataPolicy object with the updated fields.
    # Only fields specified in the update_mask will be applied.
    updated_data_policy = bigquery_datapolicies_v2.DataPolicy(
        name=data_policy_name,
        data_masking_policy=bigquery_datapolicies_v2.DataMaskingPolicy(
            predefined_expression=new_predefined_expression
        ),
    )

    # Create a FieldMask to specify which fields to update.
    # For this example, we are updating the 'predefined_expression' within 'data_masking_policy'.
    update_mask = field_mask_pb2.FieldMask(paths=["data_masking_policy.predefined_expression"])

    # Create the UpdateDataPolicyRequest.
    request = bigquery_datapolicies_v2.UpdateDataPolicyRequest(
        data_policy=updated_data_policy,
        update_mask=update_mask,
    )

    try:
        response = client.update_data_policy(request=request)
        print(f"Successfully updated data policy: {response.name}")
        print(f"New data policy type: {response.data_policy_type.name}")
        if response.data_masking_policy:
            print(f"New masking expression: {response.data_masking_policy.predefined_expression.name}")
    except exceptions.NotFound:
        print(f"Error: Data policy '{data_policy_name}' not found.")
        print("Please ensure the data policy ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END bigquerydatapolicy_v2_datapolicyservice_update_data_policy]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update an existing BigQuery Data Policy."
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
        required=True,
        help="The location of the data policy (e.g., 'us').",
    )
    parser.add_argument(
        "--data_policy_id",
        type=str,
        required=True,
        help="The ID of the data policy to update.",
    )
    parser.add_argument(
        "--new_predefined_expression",
        type=str,
        required=True,
        choices=[
            "SHA256",
            "ALWAYS_NULL",
            "DEFAULT_MASKING_VALUE",
            "LAST_FOUR_CHARACTERS",
            "FIRST_FOUR_CHARACTERS",
            "EMAIL_MASK",
            "DATE_YEAR_MASK",
            "RANDOM_HASH",
        ],
        help="The new predefined masking expression (e.g., 'SHA256').",
    )

    args = parser.parse_args()

    # Convert string to enum value
    expression_enum = getattr(
        bigquery_datapolicies_v2.DataMaskingPolicy.PredefinedExpression,
        args.new_predefined_expression,
    )

    update_data_policy_sample(
        args.project_id,
        args.location,
        args.data_policy_id,
        expression_enum,
    )
