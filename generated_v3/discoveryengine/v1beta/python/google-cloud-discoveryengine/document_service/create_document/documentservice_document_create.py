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

# [START discoveryengine_v1beta_documentservice_document_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def create_document(
    project_id: str,
    location_id: str,
    collection_id: str,
    data_store_id: str,
    branch_id: str,
    document_id: str,
) -> None:
    """Creates a document in a specified branch.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        collection_id: ID of the Collection (for example, 'example-collection-id')
        data_store_id: ID of the DataStore (for example, 'example-datastore-id')
        branch_id: ID of the Branch (for example, 'example-branch-id')
        document_id: ID of the Document (for example, 'example-document-id')
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-discoveryengine.googleapis.com")
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1beta.DocumentServiceClient(client_options=client_options)

    parent = (
        f"projects/{project_id}/locations/{location_id}/collections/"
        f"{collection_id}/dataStores/{data_store_id}/branches/{branch_id}"
    )
    document = discoveryengine_v1beta.Document(
        struct_data={
            "title": "Example Document Title",
            "uri": "https://example.com/document",
        }
    )

    request = discoveryengine_v1beta.CreateDocumentRequest(
        parent=parent,
        document=document,
        document_id=document_id,
    )

    try:
        response = client.create_document(request=request)
        print(f"Document created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END discoveryengine_v1beta_documentservice_document_create]
