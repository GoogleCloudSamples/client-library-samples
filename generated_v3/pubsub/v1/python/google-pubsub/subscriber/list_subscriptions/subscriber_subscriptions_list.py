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

# [START pubsub_v1_subscriber_subscriptions_list]
import google.api_core.exceptions
from google.cloud import pubsub_v1


def list_subscriptions(project_id: str, project: str) -> None:
    """List Pub/Sub subscriptions in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        project: The Google Cloud project ID (for example, 'example-project-id').
    """
    subscriber_client = pubsub_v1.SubscriberClient()

    # Construct the parent resource path from the project identifier.
    target_id = project_id or project
    project_path = (
        target_id
        if target_id.startswith("projects/")
        else f"projects/{target_id}"
    )

    request = {"project": project_path}

    try:
        response = subscriber_client.list_subscriptions(request=request)
        for subscription in response:
            print(f"Subscription: {subscription.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Error listing subscriptions: {exc}")
# [END pubsub_v1_subscriber_subscriptions_list]
