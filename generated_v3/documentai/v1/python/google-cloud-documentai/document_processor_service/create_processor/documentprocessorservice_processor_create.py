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

# [START documentai_v1_documentprocessorservice_processor_create]
import google.api_core.exceptions
from google.cloud import documentai_v1

client = documentai_v1.DocumentProcessorServiceClient()


def create_processor(project_id: str, location_id: str) -> None:
    """Creates a Document AI processor.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location or region where the processor is created (for example, 'us' or 'eu').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    processor = documentai_v1.Processor(
        display_name="Example OCR Processor",
        type_="OCR_PROCESSOR",
    )

    try:
        response = client.create_processor(parent=parent, processor=processor)
        print(f"Created processor: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"Type: {response.type_}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create processor: {error}")
# [END documentai_v1_documentprocessorservice_processor_create]
