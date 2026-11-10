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

# [START cloudbuild_v1_cloudbuild_build_cancel]
from google.api_core import exceptions
from google.cloud.devtools import cloudbuild_v1


def cancel_build(project_id: str, build_id: str) -> None:
    """Cancels a build in progress.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        build_id: The ID of the build to cancel (for example, 'example-build-id').
    """
    client = cloudbuild_v1.CloudBuildClient()

    request = cloudbuild_v1.CancelBuildRequest(
        project_id=project_id,
        id=build_id,
    )

    try:
        response = client.cancel_build(request=request)
        print(f"Canceled build: {response.id}")
        print(f"Status: {response.status.name}")
    except exceptions.NotFound:
        print(f"Build not found: {id}")
    except exceptions.FailedPrecondition as e:
        print(f"Build cannot be canceled: {e.message}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")


# [END cloudbuild_v1_cloudbuild_build_cancel]
