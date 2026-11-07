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

# [START discoveryengine_v1beta_userlicenseservice_userlicenses_batchupdate]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta
from google.protobuf import field_mask_pb2


def batch_update_user_licenses(
    project_id: str, location_id: str, user_store_id: str
) -> None:
    """Updates user licenses in a batch operation.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        user_store_id: Identifier of the UserStore (for example, 'default_user_store').
    """
    client = discoveryengine_v1beta.UserLicenseServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"
    )
    update_mask = field_mask_pb2.FieldMask(paths=["license_assignment_state"])
    _ = update_mask

    inline_source = (
        discoveryengine_v1beta.BatchUpdateUserLicensesRequest.InlineSource(
            user_licenses=[
                discoveryengine_v1beta.UserLicense(
                    user_principal="user1@example.com",
                    license_assignment_state=(
                        discoveryengine_v1beta.UserLicense.LicenseAssignmentState.ASSIGNED
                    ),
                )
            ]
        )
    )

    request = discoveryengine_v1beta.BatchUpdateUserLicensesRequest(
        parent=parent,
        inline_source=inline_source,
    )

    try:
        operation = client.batch_update_user_licenses(request=request)
        response = operation.result()
        print(f"Batch update completed successfully: {response}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Batch update operation failed: {error}")
# [END discoveryengine_v1beta_userlicenseservice_userlicenses_batchupdate]
