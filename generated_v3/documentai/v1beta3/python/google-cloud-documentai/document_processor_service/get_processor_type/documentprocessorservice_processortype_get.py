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

# [START documentai_v1beta3_documentprocessorservice_processortype_get]
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def get_processor_type(project_id: str, location_id: str, processor_type_id: str) -> None:
    """Retrieves processor type metadata from Document AI.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region ID, such as 'us' or 'eu'.
        processor_type_id: The system-defined processor type identifier, such as 'OCR_PROCESSOR'.
    """
    name = f"projects/{project_id}/locations/{location_id}/processorTypes/{processor_type_id}"

    request = documentai_v1beta3.GetProcessorTypeRequest(name=name)

    try:
        response = client.get_processor_type(request=request)
        print(f"Processor type name: {response.name}")
        print(f"Processor type: {response.type_}")
        print(f"Category: {response.category}")
        print(f"Allow creation: {response.allow_creation}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve processor type: {e}")
# [END documentai_v1beta3_documentprocessorservice_processortype_get]
