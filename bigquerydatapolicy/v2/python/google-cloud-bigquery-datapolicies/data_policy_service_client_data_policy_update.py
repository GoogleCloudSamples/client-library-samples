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

# [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_update]
# [START bigquerydatapolicy_datapolicyservice_datapolicy_update]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2
from google.protobuf import field_mask_pb2

client = bigquery_datapolicies_v2.DataPolicyServiceClient()


def update_data_policy(
    project_id: str,
    location: str,
    data_policy_id: str
) -> None:
    """Updates the data masking configuration of an existing data policy.

    This example demonstrates how to use a FieldMask to selectively update the
    `data_masking_policy` (for example, changing the masking expression from
    ALWAYS_NULL to SHA256) without affecting other fields or recreating the policy.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location (for example, "us") of the data policy.
        data_policy_id: The ID of the data policy to update.
    """

    data_policy_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    # To prevent race conditions, use the policy's etag in the update.
    existing_policy = client.get_data_policy(name=data_policy_name)

    # This example transitions a masking rule from ALWAYS_NULL to SHA256.
    updated_data_policy = bigquery_datapolicies_v2.DataPolicy(
        name=data_policy_name,
        data_masking_policy=bigquery_datapolicies_v2.DataMaskingPolicy(
            predefined_expression=bigquery_datapolicies_v2.DataMaskingPolicy.PredefinedExpression.SHA256
        ),
        etag=existing_policy.etag,
    )

    # Use a field mask to selectively update only the data masking policy.
    update_mask = field_mask_pb2.FieldMask(
        paths=["data_masking_policy"]
    )
    request = bigquery_datapolicies_v2.UpdateDataPolicyRequest(
        data_policy=updated_data_policy,
        update_mask=update_mask,
    )

    try:
        response = client.update_data_policy(request=request)
        print(f"Successfully updated data policy: {response.name}")
        print(f"New data policy type: {response.data_policy_type.name}")
        if response.data_masking_policy:
            print(
                f"New masking expression: {response.data_masking_policy.predefined_expression.name}"
            )
    except exceptions.NotFound:
        print(f"Error: Data policy '{data_policy_name}' not found.")
        print("Make sure the data policy ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_update]
