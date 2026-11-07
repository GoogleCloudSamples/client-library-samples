# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START discoveryengine_v1_userlicenseservice_userlicenses_batchupdate]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1
from google.protobuf import field_mask_pb2


def batch_update_user_licenses(
    project_id: str, location_id: str, user_store_id: str
) -> None:
    """Updates user licenses in a user store in batch.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        user_store_id: ID of the UserStore (for example, 'example-userstore-id').
    """
    client = discoveryengine_v1.UserLicenseServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"
    inline_source = discoveryengine_v1.BatchUpdateUserLicensesRequest.InlineSource(
        user_licenses=[
            discoveryengine_v1.UserLicense(
                user_principal="user@example.com",
            ),
        ]
    )
    update_mask = field_mask_pb2.FieldMask(paths=["license_assignment_state"])

    request = discoveryengine_v1.BatchUpdateUserLicensesRequest(
        parent=parent,
        inline_source=inline_source,
    )

    try:
        operation = client.batch_update_user_licenses(request=request)
        response = operation.result()
        print(f"Batch update completed successfully: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END discoveryengine_v1_userlicenseservice_userlicenses_batchupdate]
