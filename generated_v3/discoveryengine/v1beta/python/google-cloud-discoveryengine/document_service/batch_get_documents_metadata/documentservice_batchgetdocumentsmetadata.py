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

# [START discoveryengine_v1beta_documentservice_batch_get_documents_metadata]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def batch_get_documents_metadata(
    project_id: str,
    location_id: str,
    data_store_id: str,
    branch_id: str,
) -> None:
    """Retrieves document metadata for a batch of website search documents.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'global').
        data_store_id: ID of the DataStore (for example, 'example-datastore-id').
        branch_id: ID of the Branch, typically 'default_branch'.
    """
    client_options = (
        {"api_endpoint": f"{location_id}-discoveryengine.googleapis.com"}
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1beta.DocumentServiceClient(
        client_options=client_options
    )

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"dataStores/{data_store_id}/branches/{branch_id}"
    )
    matcher = discoveryengine_v1beta.BatchGetDocumentsMetadataRequest.Matcher(
        uris_matcher=discoveryengine_v1beta.BatchGetDocumentsMetadataRequest.UrisMatcher(
            uris=["https://example.com/page1"]
        )
    )

    request = discoveryengine_v1beta.BatchGetDocumentsMetadataRequest(
        parent=parent,
        matcher=matcher,
    )

    try:
        response = client.batch_get_documents_metadata(request=request)
        print(f"Retrieved document count: {len(response.documents_metadata)}")
        for document_metadata in response.documents_metadata:
            print(f"Matcher value: {document_metadata.matcher_value}")
            print(f"State: {document_metadata.state.name}")
            print(f"Last crawled time: {document_metadata.last_crawled_time}")
    except google.api_core.exceptions.FailedPrecondition as exc:
        print(f"Data store configuration precondition: {exc.message}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.PermissionDenied,
    ) as exc:
        print(f"API request notice: {exc.message}")
# [END discoveryengine_v1beta_documentservice_batch_get_documents_metadata]
