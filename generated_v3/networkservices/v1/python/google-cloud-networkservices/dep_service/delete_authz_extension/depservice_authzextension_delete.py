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

# [START networkservices_v1_depservice_authzextension_delete]
import google.api_core.exceptions
from google.cloud import network_services_v1


def delete_authz_extension(
    project_id: str, location_id: str, authz_extension_id: str
) -> None:
    """Deletes an AuthzExtension resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        authz_extension_id: The ID of the AuthzExtension (for example, 'example-authz-extension-id').
    """
    client = network_services_v1.DepServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/authzExtensions/{authz_extension_id}"

    request = network_services_v1.DeleteAuthzExtensionRequest(
        name=name,
    )

    try:
        operation = client.delete_authz_extension(request=request)
        # Wait for the long-running operation to complete.
        operation.result()
        print(f"Deleted AuthzExtension: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")


# [END networkservices_v1_depservice_authzextension_delete]
