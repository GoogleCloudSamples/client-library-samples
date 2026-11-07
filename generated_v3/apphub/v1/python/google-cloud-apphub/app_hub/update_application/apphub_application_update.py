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

# [START apphub_v1_apphub_application_update]
import google.api_core.exceptions
from google.cloud import apphub_v1
from google.protobuf import field_mask_pb2

client = apphub_v1.AppHubClient()


def update_application(
    project_id: str, location_id: str, application_id: str
) -> None:
    """Updates an AppHub Application.

    Args:
        project_id: The Google Cloud project ID where the Application resides.
        location_id: The location where the Application resides (for example, 'global').
        application_id: The identifier of the Application to update.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    application = apphub_v1.Application(
        name=f"projects/{project_id}/locations/{location_id}/applications/{application_id}",
        description="Updated application description",
    )

    try:
        operation = client.update_application(
            application=application,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Application updated: {response.name}")
        print(f"Updated description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Update operation failed: {error}")
# [END apphub_v1_apphub_application_update]
