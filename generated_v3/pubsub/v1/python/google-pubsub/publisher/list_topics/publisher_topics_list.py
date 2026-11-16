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

# [START pubsub_v1_publisher_topics_list]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.PublisherClient()


def list_topics(project_id: str) -> None:
    """Lists Pub/Sub topics in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    project = f"projects/{project_id}"

    try:
        response = client.list_topics(request={"project": project})
        for topic in response:
            print(f"Topic: {topic.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list topics: {error}")
# [END pubsub_v1_publisher_topics_list]
