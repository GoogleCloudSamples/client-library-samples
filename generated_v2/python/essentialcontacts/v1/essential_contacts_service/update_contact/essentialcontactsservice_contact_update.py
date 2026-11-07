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

# [START essentialcontacts_v1_essentialcontactsservice_contact_update]
from google.api_core import exceptions
from google.cloud import essential_contacts_v1
from google.protobuf import field_mask_pb2


def update_contact(project_id: str, contact_id: str) -> None:
    """Updates the language preference for an essential contact.

    Args:
        project_id: The ID of the Google Cloud project.
        contact_id: The server-generated ID of the contact.
    """
    client = essential_contacts_v1.EssentialContactsServiceClient()

    contact_name = f"projects/{project_id}/contacts/{contact_id}"
    contact = essential_contacts_v1.Contact(
        name=contact_name,
        language_tag="en-US",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["language_tag"])

    try:
        response = client.update_contact(
            contact=contact,
            update_mask=update_mask,
        )
        print(f"Updated contact: {response.name}")
        print(f"Language tag: {response.language_tag}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END essentialcontacts_v1_essentialcontactsservice_contact_update]
