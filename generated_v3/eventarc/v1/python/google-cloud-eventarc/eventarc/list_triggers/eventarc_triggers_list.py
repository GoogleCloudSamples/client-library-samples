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

# [START eventarc_v1_eventarc_triggers_list]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def list_triggers(project_id: str, location_id: str) -> None:
    """Lists Eventarc triggers in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region (for example, 'us-central1' or 'global').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = eventarc_v1.ListTriggersRequest(parent=parent)

    try:
        response = client.list_triggers(request=request)
        for trigger in response:
            print(f"Trigger Name: {trigger.name}")
            print(f"Destination: {trigger.destination}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing triggers: {error.message}")
# [END eventarc_v1_eventarc_triggers_list]
