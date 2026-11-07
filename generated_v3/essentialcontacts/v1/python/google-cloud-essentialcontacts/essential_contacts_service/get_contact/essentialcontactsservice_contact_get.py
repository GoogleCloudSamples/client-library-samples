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

# [START essentialcontacts_v1_essentialcontactsservice_contact_get]
from google.api_core import exceptions
from google.cloud import essential_contacts_v1


def get_contact(project_id: str, contact_id: str) -> None:
    """Gets an essential contact for a project.

    Args:
        project_id: The Google Cloud project ID.
        contact_id: The server-generated ID of the contact.
    """
    client = essential_contacts_v1.EssentialContactsServiceClient()
    name = f"projects/{project_id}/contacts/{contact_id}"

    try:
        response = client.get_contact(name=name)
        print(f"Contact name: {response.name}")
        print(f"Email: {response.email}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END essentialcontacts_v1_essentialcontactsservice_contact_get]
