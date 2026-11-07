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

# [START firestore_v1_firestore_document_get]
import google.api_core.exceptions
from google.cloud import firestore_v1
from google.cloud.firestore_v1.services.firestore import FirestoreClient

client = FirestoreClient()


def get_document(project_id: str, database_id: str, document_path_id: str) -> None:
    """Retrieves a document from Cloud Firestore.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        database_id: ID of the Database (for example, 'example-database-id')
        document_path_id: ID of the DocumentPath (for example, 'example-documentpath-id')
    """
    name = f"projects/{project_id}/databases/{database_id}/documents/{document_path_id}"

    request = firestore_v1.types.GetDocumentRequest(
        name=name,
    )

    try:
        response = client.get_document(request=request)
        print(f"Retrieved document: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve document: {e}")
# [END firestore_v1_firestore_document_get]
