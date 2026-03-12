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

# [START documentai_v1beta3_documents_list_full]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1beta3 as documentai

client = documentai.DocumentServiceClient()


def list_documents_full(
    project_id: str,
    location: str,
    processor_id: str,
    page_size: int,
) -> None:
    """List documents with pagination.

    Lists the documents in a dataset with pagination support.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor.
        page_size: The maximum number of documents to return.
    """
    # Create the full resource name of the dataset
    dataset = (
        f"projects/{project_id}/locations/{location}/processors/{processor_id}/dataset"
    )

    request = documentai.ListDocumentsRequest(
        dataset=dataset,
        page_size=page_size,
    )

    try:
        page_result = client.list_documents(request=request)

        for document in page_result:
            print(f"Document ID: {document.document_id.revision_reference.revision_id}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Dataset, Resource ID: {processor_id}",
            file=sys.stderr,
        )


# [END documentai_v1beta3_documents_list_full]
