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

# [START eventarc_v1_eventarc_googleapisource_delete]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def delete_google_api_source(
    project_id: str, location_id: str, google_api_source_id: str
) -> None:
    """Deletes a Google API source in Eventarc.

    Args:
        project_id: The Google Cloud project ID hosting the GoogleApiSource.
        location_id: The Google Cloud region where the target GoogleApiSource was provisioned.
        google_api_source_id: The ID of an existing GoogleApiSource to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"googleApiSources/{google_api_source_id}"
    )

    try:
        # DeleteGoogleApiSource initiates a long-running operation
        operation = client.delete_google_api_source(name=name)
        operation.result()
        print(f"Deleted Google API source: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete Google API source: {e.message}")


# [END eventarc_v1_eventarc_googleapisource_delete]
