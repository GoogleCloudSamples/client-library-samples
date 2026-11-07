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

# [START networksecurity_v1alpha1_sserealmservice_sacattachments_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_sac_attachments(project_id: str, location_id: str) -> None:
    """Lists SAC attachments in a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
    """
    client = network_security_v1alpha1.SSERealmServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1alpha1.ListSACAttachmentsRequest(
        parent=parent,
    )

    try:
        response = client.list_sac_attachments(request=request)
        count = 0
        for attachment in response:
            print(f"Attachment name: {attachment.name}")
            count += 1
        if count == 0:
            print("No SAC attachments found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error occurred: {e}")


# [END networksecurity_v1alpha1_sserealmservice_sacattachments_list]
