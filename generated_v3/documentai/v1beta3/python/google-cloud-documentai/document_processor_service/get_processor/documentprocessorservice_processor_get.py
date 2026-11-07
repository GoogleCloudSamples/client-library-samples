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

# [START documentai_v1beta3_documentprocessorservice_processor_get]
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def get_processor(project_id: str, location_id: str, processor_id: str) -> None:
    """Retrieve details of an existing Document AI processor.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region where the processor resides (for example, 'us' or 'eu').
        processor_id: The server-generated ID of the processor to retrieve.
    """
    # Configure the client endpoint for the specified regional location.
    client_options = {"api_endpoint": f"{location_id}-documentai.googleapis.com"}
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=client_options
    )

    name = f"projects/{project_id}/locations/{location_id}/processors/{processor_id}"
    request = documentai_v1beta3.GetProcessorRequest(name=name)

    try:
        response = client.get_processor(request=request)
        print(f"Processor Name: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Type: {response.type_}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve processor: {error.message}")
# [END documentai_v1beta3_documentprocessorservice_processor_get]
