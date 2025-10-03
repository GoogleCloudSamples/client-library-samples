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

# [START secretmanager_v1_secretmanagerservice_iampolicy_get]
import google.cloud.secretmanager_v1
from google.api_core import exceptions
from google.iam.v1 import iam_policy_pb2


def get_secret_iam_policy(project_id: str, secret_id: str) -> None:
    """
    Gets the IAM policy for a secret.

    The IAM policy defines who has what permissions on a given resource.
    This sample demonstrates how to retrieve the current IAM policy
    associated with a specific secret, which includes all bindings (roles and members).

    Args:
        project_id: The Google Cloud project ID.
        secret_id: The ID of the secret to get the IAM policy for.
    """
    client = google.cloud.secretmanager_v1.SecretManagerServiceClient()

    secret_name = client.secret_path(project_id, secret_id)
    request = iam_policy_pb2.GetIamPolicyRequest(
        resource=secret_name,
    )

    try:
        policy = client.get_iam_policy(request=request)

        print(f"IAM Policy for secret '{secret_id}':")
        found_bindings = False
        for binding in policy.bindings:
            found_bindings = True
            members_str = ", ".join(binding.members)
            print(f"  Role: {binding.role}, Members: [{members_str}]")
        if not found_bindings:
            print("  No bindings found.")
        if policy.etag:
            print(f"  ETag: {policy.etag}")
        if policy.version:
            print(f"  Version: {policy.version}")

    except exceptions.NotFound:
        print(f"Error: Secret '{secret_id}' not found in project '{project_id}'.")
        print(
            "Please ensure the secret ID and project ID are correct and the secret exists."
        )
        raise
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, secret ID, and permissions.")
        raise


# [END secretmanager_v1_secretmanagerservice_iampolicy_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the IAM policy for a Secret Manager secret."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--secret_id",
        type=str,
        required=True,
        help="The ID of the secret to get the IAM policy for.",
    )
    args = parser.parse_args()

    get_secret_iam_policy(args.project_id, args.secret_id)
