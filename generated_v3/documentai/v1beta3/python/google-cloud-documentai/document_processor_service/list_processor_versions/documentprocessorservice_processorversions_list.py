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

# [START documentai_v1beta3_documentprocessorservice_processorversions_list]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import documentai_v1beta3


def list_processor_versions(
    project_id: str, location_id: str, processor_id: str
) -> None:
    """Lists processor versions for a Document AI processor.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the processor is located (for example, 'us').
        processor_id: The ID of the processor (for example, 'example-processor-id').
    """
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=ClientOptions(
            api_endpoint=f"{location_id}-documentai.googleapis.com"
        )
    )

    parent = client.processor_path(project_id, location_id, processor_id)

    request = documentai_v1beta3.ListProcessorVersionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_processor_versions(request=request)
        for response in page_result:
            print(f"Processor version: {response.name}")
            print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END documentai_v1beta3_documentprocessorservice_processorversions_list]
