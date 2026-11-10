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

# [START apphub_v1_apphub_application_delete]
import google.api_core.exceptions
from google.cloud import apphub_v1


def delete_application(
    project_id: str, location_id: str, application_id: str
) -> None:
    """Deletes an AppHub application.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the application is located (for example, 'us-central1').
        application_id: ID of the Application (for example, 'example-application-id').
    """
    client = apphub_v1.AppHubClient()

    name = f"projects/{project_id}/locations/{location_id}/applications/{application_id}"

    request = apphub_v1.DeleteApplicationRequest(
        name=name,
    )

    try:
        operation = client.delete_application(request=request)
        operation.result()
        print(f"Deleted application: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete application: {e}")
# [END apphub_v1_apphub_application_delete]
