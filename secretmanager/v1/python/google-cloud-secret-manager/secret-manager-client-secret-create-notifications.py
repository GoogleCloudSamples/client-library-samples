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

# [START secretmanager_v1_secretmanagerservice_secret_create_notifications_with_topics]
import google.api_core.exceptions
from google.cloud import secretmanager_v1


def create_secret_with_notifications(
    project_id: str, secret_id: str, topic_id: str
) -> None:
    """Creates a new secret resource configured with Pub/Sub notifications. This demonstrates how to receive notifications when secret versions are added or destroyed.

    Args:
        project_id: Google Cloud Project ID (such as 'example-project-id')
        secret_id: ID of the secret to create (such as 'my-secret-id')
        topic_id: ID of the Pub/Sub topic (such as 'my-topic-id')
    """
    client = secretmanager_v1.SecretManagerServiceClient()

    parent = f"projects/{project_id}"

    try:
        response = client.create_secret(
            request={
                "parent": parent,
                "secret_id": secret_id,
                "secret": {
                    "replication": {"automatic": {}},
                    "topics": [{"name": f"projects/{project_id}/topics/{topic_id}"}],
                },
            }
        )

        print(f"Created secret: {response.name}")
        for topic in response.topics:
            print(f"  Topic: {topic.name}")

    except google.api_core.exceptions.AlreadyExists:
        print(
            f"Error: The secret '{secret_id}' already exists in project "
            f"'{project_id}'. Use a different, unique secret ID."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END secretmanager_v1_secretmanagerservice_secret_create_notifications_with_topics]
