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

# [START documentai_v1_documentprocessor_processdocument_execute_full]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1 as documentai

client = documentai.DocumentProcessorServiceClient()


def process_document_full(
    project_id: str,
    location: str,
    processor_id: str,
    gcs_input_uri: str,
) -> None:
    """Process a document from Cloud Storage.

    Processes a document stored in a Cloud Storage bucket.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor to use.
        gcs_input_uri: The Cloud Storage URI of the input document.
    """
    name = client.processor_path(project_id, location, processor_id)

    request = documentai.ProcessRequest(
        name=name,
        gcs_document=documentai.GcsDocument(
            gcs_uri=gcs_input_uri, mime_type="application/pdf"
        ),
    )

    try:
        result = client.process_document(request=request)

        print(f"Processed document text: {result.document.text[:50]}...")
        print(f"Processor: {name}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Processor, Resource ID: {processor_id}",
            file=sys.stderr,
        )


# [END documentai_v1_documentprocessor_processdocument_execute_full]
