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

# [START secretmanager_v1beta1_secretmanagerservice_iampolicy_get]
from google.api_core import exceptions as core_exceptions
from google.cloud import secretmanager_v1beta1
from google.iam.v1 import policy_pb2


def get_secret_iam_policy(project_id: str, secret_id: str) -> None:
    """Gets the IAM policy for a secret.

    This method demonstrates how to retrieve the Identity and Access Management
    (IAM) policy associated with a specific secret. The IAM policy defines
    who has what permissions on the secret. If no policy is explicitly set,
    an empty policy will be returned.

    Args:
        project_id: The ID of the Google Cloud project.
        secret_id: The ID of the secret whose IAM policy is to be retrieved.
    """
    try:
        client = secretmanager_v1beta1.SecretManagerServiceClient()

        secret_name = client.secret_path(project_id, secret_id)

        policy = client.get_iam_policy(request={"resource": secret_name})

        print(f"Successfully retrieved IAM policy for secret: {secret_name}")
        print(f"Policy Version: {policy.version}")
        print(f"Policy Etag: {policy.etag}")

        if policy.bindings:
            print("Bindings:")
            for binding in policy.bindings:
                print(f"  Role: {binding.role}")
                print("  Members:")
                for member in binding.members:
                    print(f"    - {member}")
                if binding.condition.expression:
                    print(f"  Condition: {binding.condition.expression}")
        else:
            print("No bindings found in the policy.")

    except core_exceptions.NotFound:
        print(f"Error: Secret '{secret_id}' not found in project '{project_id}'.")
        print("Please ensure the secret ID and project ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1beta1_secretmanagerservice_iampolicy_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the IAM policy for a Google Cloud Secret Manager secret."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID. ",
    )
    parser.add_argument(
        "--secret_id",
        required=True,
        type=str,
        help="The ID of the secret.",
    )
    args = parser.parse_args()
    get_secret_iam_policy(args.project_id, args.secret_id)
