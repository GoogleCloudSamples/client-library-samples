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

# [START pubsub_v1_subscriber_snapshots_list]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SubscriberClient()


def list_snapshots(project_id: str) -> None:
    """Lists Pub/Sub snapshots in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    project = f"projects/{project_id}"

    try:
        response = client.list_snapshots(request={"project": project})
        for snapshot in response:
            print(f"Snapshot name: {snapshot.name}")
            print(f"Topic: {snapshot.topic}")
            print(f"Expiration time: {snapshot.expire_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list snapshots: {error}")
# [END pubsub_v1_subscriber_snapshots_list]
