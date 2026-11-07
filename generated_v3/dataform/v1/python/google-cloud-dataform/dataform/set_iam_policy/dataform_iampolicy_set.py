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

# [START dataform_v1_dataform_set_iam_policy]
import google.api_core.exceptions
from google.cloud import dataform_v1
from google.iam.v1 import iam_policy_pb2, policy_pb2
from google.protobuf import field_mask_pb2

client = dataform_v1.DataformClient()


def set_iam_policy(project_id: str, location_id: str, repository_id: str) -> None:
    """Sets the IAM policy for a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository resides (for example, 'us-central1').
        repository_id: The ID of the Dataform repository.
    """
    resource = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    try:
        current_policy = client.get_iam_policy(
            request=iam_policy_pb2.GetIamPolicyRequest(resource=resource)
        )

        new_binding = policy_pb2.Binding(
            role="roles/dataform.viewer",
            members=[f"serviceAccount:example-account@{project_id}.iam.gserviceaccount.com"],
        )
        current_policy.bindings.append(new_binding)

        policy = current_policy
        update_mask = field_mask_pb2.FieldMask(paths=["bindings"])

        request = iam_policy_pb2.SetIamPolicyRequest(
            resource=resource,
            policy=policy,
            update_mask=update_mask,
        )

        response = client.set_iam_policy(request=request)
        print(f"Set IAM policy successfully on {resource}. Etag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to set IAM policy: {e}")
# [END dataform_v1_dataform_set_iam_policy]
