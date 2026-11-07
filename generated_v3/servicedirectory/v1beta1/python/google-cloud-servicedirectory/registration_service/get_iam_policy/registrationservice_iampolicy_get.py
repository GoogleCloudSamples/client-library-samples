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

# [START servicedirectory_v1beta1_registrationservice_iampolicy_get]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1


def get_iam_policy(project_id: str, location_id: str, namespace_id: str) -> None:
    """Retrieves the IAM policy for a Service Directory namespace.

    Args:
        project_id: The Google Cloud project ID where the namespace is hosted.
        location_id: The Google Cloud region for the namespace (for example, 'us-central1').
        namespace_id: The ID of the Service Directory namespace.
    """
    client = servicedirectory_v1beta1.RegistrationServiceClient()

    resource = (
        f"projects/{project_id}/locations/{location_id}/namespaces/{namespace_id}"
    )

    try:
        policy = client.get_iam_policy(request={"resource": resource})
        print(f"Retrieved IAM policy for resource: {resource}")
        print(f"Policy version: {policy.version}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}")
            print(f"Members: {', '.join(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve IAM policy: {e}")
# [END servicedirectory_v1beta1_registrationservice_iampolicy_get]
