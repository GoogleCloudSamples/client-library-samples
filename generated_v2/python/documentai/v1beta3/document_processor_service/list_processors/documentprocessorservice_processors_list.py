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

# [START documentai_v1beta3_documentprocessorservice_processors_list]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def list_processors(project_id: str, location_id: str) -> None:
    """Lists Document AI processors in a given Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the processors reside (for example, 'us' or 'eu').
    """
    # Configure the client to route requests to the specified regional endpoint.
    client_options = ClientOptions(
        api_endpoint=f"{location_id}-documentai.googleapis.com"
    )
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=client_options
    )

    parent = f"projects/{project_id}/locations/{location_id}"

    request = documentai_v1beta3.ListProcessorsRequest(
        parent=parent,
    )

    try:
        response = client.list_processors(request=request)
        for processor in response:
            print(f"Processor Name: {processor.name}")
            print(f"Display Name: {processor.display_name}")
            print(f"Type: {processor.type_}")
            print(f"State: {processor.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list processors: {error}")
# [END documentai_v1beta3_documentprocessorservice_processors_list]
