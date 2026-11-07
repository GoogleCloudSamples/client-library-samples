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

# [START essentialcontacts_v1_essentialcontactsservice_contact_create]
import google.api_core.exceptions
from google.cloud import essential_contacts_v1


def create_contact(project_id: str) -> None:
    """Creates an essential contact for a Google Cloud project.

    Args:
        project_id: The ID of the Google Cloud project to create the contact for.
    """
    client = essential_contacts_v1.EssentialContactsServiceClient()

    parent = f"projects/{project_id}"
    contact = essential_contacts_v1.Contact(
        email="contact@example.com",
        notification_category_subscriptions=[
            essential_contacts_v1.NotificationCategory.TECHNICAL
        ],
        language_tag="en-US",
    )

    try:
        response = client.create_contact(parent=parent, contact=contact)
        print(f"Created contact: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END essentialcontacts_v1_essentialcontactsservice_contact_create]
