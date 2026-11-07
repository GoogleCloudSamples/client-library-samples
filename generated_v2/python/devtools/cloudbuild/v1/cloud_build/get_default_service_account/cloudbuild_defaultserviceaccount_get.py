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

# [START cloudbuild_v1_cloudbuild_defaultserviceaccount_get]
from google.api_core import exceptions
from google.cloud.devtools import cloudbuild_v1


def get_default_service_account(project_id: str, location_id: str) -> None:
    """Gets the default service account for a Cloud Build location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = cloudbuild_v1.CloudBuildClient()

    name = f"projects/{project_id}/locations/{location_id}/defaultServiceAccount"

    request = cloudbuild_v1.GetDefaultServiceAccountRequest(
        name=name,
    )

    try:
        response = client.get_default_service_account(request=request)
        print(f"Retrieved default service account: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve default service account: {e}")


# [END cloudbuild_v1_cloudbuild_defaultserviceaccount_get]
