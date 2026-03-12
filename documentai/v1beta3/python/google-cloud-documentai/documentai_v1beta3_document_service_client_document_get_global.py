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

# [START documentai_v1beta3_document_get]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1beta3 as documentai

client = documentai.DocumentServiceClient()


def get_document(
    project_id: str,
    location: str,
    processor_id: str,
    document_id: str,
) -> None:
    """Get document.

    Retrieves a document from a dataset.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor.
        document_id: The ID of the document to retrieve.
    """

    request = documentai.GetDocumentRequest(
        dataset=f"projects/{project_id}/locations/{location}/processors/{processor_id}/dataset",
        document_id=documentai.DocumentId(
            revision_reference=documentai.DocumentId.RevisionReference(
                revision_id=document_id
            )
        ),
    )

    try:
        response = client.get_document(request=request)

        print(f"Document Name: {response.document.text[:50]}...")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Document, Resource ID: {document_id}",
            file=sys.stderr,
        )


# [END documentai_v1beta3_document_get]
