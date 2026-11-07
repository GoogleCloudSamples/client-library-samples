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

# [START essentialcontacts_v1_essentialcontactsservice_contacts_list]
import google.api_core.exceptions
from google.cloud import essential_contacts_v1


def list_contacts(project_id: str) -> None:
    """Lists essential contacts for a Google Cloud project.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = essential_contacts_v1.EssentialContactsServiceClient()
    parent = f"projects/{project_id}"

    try:
        contacts = client.list_contacts(parent=parent)
        for contact in contacts:
            print(f"Contact name: {contact.name}")
            print(f"Email: {contact.email}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END essentialcontacts_v1_essentialcontactsservice_contacts_list]
