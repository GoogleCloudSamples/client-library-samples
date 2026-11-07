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

# [START discoveryengine_v1alpha_documentservice_documents_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.DocumentServiceClient()


def list_documents(
    project_id: str,
    location_id: str,
    collection_id: str,
    data_store_id: str,
    branch_id: str,
) -> None:
    """Use the list_documents method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        collection_id: ID of the Collection (for example, 'example-collection-id')
        data_store_id: ID of the DataStore (for example, 'example-datastore-id')
        branch_id: ID of the Branch (for example, 'example-branch-id')
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/collections/{collection_id}/"
        f"dataStores/{data_store_id}/branches/{branch_id}"
    )

    request = discoveryengine_v1alpha.ListDocumentsRequest(
        parent=parent,
    )

    try:
        response = client.list_documents(request=request)
        for document in response:
            print(f"Document ID: {document.id}")
            print(f"Document Name: {document.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list documents: {e}")
# [END discoveryengine_v1alpha_documentservice_documents_list]
