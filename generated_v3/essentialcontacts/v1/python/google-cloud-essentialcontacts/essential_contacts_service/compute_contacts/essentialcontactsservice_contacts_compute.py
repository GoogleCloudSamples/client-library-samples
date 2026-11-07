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

# [START essentialcontacts_v1_essentialcontactsservice_compute_contacts]
import google.api_core.exceptions
from google.cloud import essential_contacts_v1


def compute_contacts(project_id: str) -> None:
    """Computes contacts that receive notifications for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to compute contacts for (for example, 'example-project-id').
    """
    client = essential_contacts_v1.EssentialContactsServiceClient()

    parent = f"projects/{project_id}"

    request = essential_contacts_v1.ComputeContactsRequest(
        parent=parent,
        notification_categories=[
            essential_contacts_v1.NotificationCategory.TECHNICAL
        ],
    )

    try:
        response = client.compute_contacts(request=request)
        for contact in response:
            print(f"Contact resource: {contact.name}")
            print(f"Email: {contact.email}")
            print(f"Language tag: {contact.language_tag}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END essentialcontacts_v1_essentialcontactsservice_compute_contacts]
