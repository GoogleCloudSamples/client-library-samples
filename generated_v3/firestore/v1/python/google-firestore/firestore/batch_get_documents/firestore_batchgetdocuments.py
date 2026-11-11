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

# [START firestore_v1_firestore_batch_get_documents]
import google.api_core.exceptions
from google.cloud import firestore_v1
from google.cloud.firestore_v1.services.firestore import FirestoreClient

client = FirestoreClient()


def batch_get_documents(project_id: str, database_id: str) -> None:
    """Batch gets multiple documents from Firestore.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        database_id: ID of the Database (for example, 'example-database-id').
    """
    database = f"projects/{project_id}/databases/{database_id}"
    documents = [
        f"{database}/documents/example-collection/example-document-1",
        f"{database}/documents/example-collection/example-document-2",
    ]

    request = firestore_v1.types.BatchGetDocumentsRequest(
        database=database,
        documents=documents,
    )

    try:
        response_stream = client.batch_get_documents(request=request)
        for response in response_stream:
            if response.found:
                print(f"Found document: {response.found.name}")
            elif response.missing:
                print(f"Missing document: {response.missing}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END firestore_v1_firestore_batch_get_documents]
