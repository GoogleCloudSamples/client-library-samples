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

# [START documentai_v1_documentprocessorservice_processorversion_get]
import google.api_core.exceptions
from google.cloud import documentai_v1

client = documentai_v1.DocumentProcessorServiceClient()


def get_processor_version(
    project_id: str,
    location_id: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """Retrieves a processor version from Document AI.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location where the processor is hosted (for example, 'us' or 'eu').
        processor_id: The server-generated ID of the processor.
        processor_version_id: The ID of the processor version to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/processors/"
        f"{processor_id}/processorVersions/{processor_version_id}"
    )

    request = documentai_v1.GetProcessorVersionRequest(name=name)

    try:
        response = client.get_processor_version(request=request)
        print(f"Processor version name: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.NotFound as exc:
        print(f"Processor version not found: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END documentai_v1_documentprocessorservice_processorversion_get]
