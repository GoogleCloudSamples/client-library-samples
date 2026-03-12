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

# [START documentai_v1_documentprocessor_processdocument_execute]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1 as documentai

client = documentai.DocumentProcessorServiceClient()


def process_document(
    project_id: str,
    location: str,
    processor_id: str,
    file_path: str,
    mime_type: str,
) -> None:
    """Process a document.

    Processes a document using the Document AI API.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor to use.
        file_path: The path to the local file to process.
        mime_type: The MIME type of the file.
    """
    name = client.processor_path(project_id, location, processor_id)

    with open(file_path, "rb") as image:
        image_content = image.read()

    request = documentai.ProcessRequest(
        name=name,
        raw_document=documentai.RawDocument(content=image_content, mime_type=mime_type),
    )

    try:
        result = client.process_document(request=request)

        print(f"Processed document: {result.document.text[:50]}...")
        print(f"Processor: {name}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Processor, Resource ID: {processor_id}",
            file=sys.stderr,
        )


# [END documentai_v1_documentprocessor_processdocument_execute]
