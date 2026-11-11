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

# [START documentai_v1beta3_documentprocessorservice_processorversion_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def get_processor_version(
    project_id: str,
    location_id: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """Use the get_processor_version method.

    Args:
        project_id: The Google Cloud project ID where the processor resides.
        location_id: The location ID of the processor (for example, 'us' or 'eu').
        processor_id: The ID of the processor parent resource.
        processor_version_id: The ID of the processor version to retrieve.
    """
    # Configure the client to connect to the regional Document AI endpoint.
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=ClientOptions(
            api_endpoint=f"{location_id}-documentai.googleapis.com"
        )
    )

    name = f"projects/{project_id}/locations/{location_id}/processors/{processor_id}/processorVersions/{processor_version_id}"

    request = documentai_v1beta3.GetProcessorVersionRequest(name=name)

    try:
        response = client.get_processor_version(request=request)
        print(f"Processor version name: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error retrieving processor version: {e}")
# [END documentai_v1beta3_documentprocessorservice_processorversion_get]
