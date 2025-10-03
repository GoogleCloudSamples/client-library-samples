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

import argparse

# [START secretmanager_v1beta2_secretmanagerservice_iampolicy_get]
from google.cloud import secretmanager_v1beta2
from google.api_core import exceptions
from google.iam.v1 import iam_policy_pb2


def get_secret_iam_policy(project_id: str, secret_id: str) -> None:
    """Gets the IAM policy for a secret.

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to get the IAM policy for.
    """
    client = secretmanager_v1beta2.SecretManagerServiceClient()

    name = client.secret_path(project_id, secret_id)

    try:
        request = iam_policy_pb2.GetIamPolicyRequest(resource=name)

        policy = client.get_iam_policy(request=request)

        print(f"IAM policy for secret '{secret_id}':")
        for binding in policy.bindings:
            print(f"  Role: {binding.role}")
            print(f"  Members:")
            for member in binding.members:
                print(f"    - {member}")
            if binding.condition:
                print(f"    Condition: {binding.condition.expression}")
        print(f"  ETag: {policy.etag}")
        print(f"  Version: {policy.version}")

    except exceptions.NotFound:
        print(f"Error: Secret '{secret_id}' not found in project '{project_id}'.")
        print("Please ensure the secret ID and project ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta2_secretmanagerservice_iampolicy_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the IAM policy for a Secret Manager secret."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--secret_id",
        required=True,
        type=str,
        help="The ID of the secret (e.g., 'my-secret-with-policy'). "
        "This secret must exist and have an IAM policy.",
    )
    args = parser.parse_args()
    get_secret_iam_policy(args.project_id, args.secret_id)
