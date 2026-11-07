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

# [START documentai_v1beta3_documentprocessorservice_processortypes_list]
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def list_processor_types(project_id: str, location_id: str) -> None:
    """List available Document AI processor types in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id')
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1')
    """
    parent = client.common_location_path(project_id, location_id)

    request = documentai_v1beta3.ListProcessorTypesRequest(
        parent=parent,
    )

    try:
        response = client.list_processor_types(request=request)
        for processor_type in response:
            print(f"Processor type: {processor_type.type_}")
            print(f"Category: {processor_type.category}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list processor types: {error}")


# [END documentai_v1beta3_documentprocessorservice_processortypes_list]
