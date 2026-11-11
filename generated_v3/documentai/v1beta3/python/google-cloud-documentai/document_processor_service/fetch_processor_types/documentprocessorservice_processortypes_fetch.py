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

# [START documentai_v1beta3_documentprocessorservice_fetch_processor_types]
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def fetch_processor_types(project_id: str, location_id: str) -> None:
    """Fetches processor types available for the specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us' or 'eu').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = documentai_v1beta3.FetchProcessorTypesRequest(
        parent=parent,
    )

    try:
        response = client.fetch_processor_types(request=request)
        for processor_type in response.processor_types:
            print(f"Processor type: {processor_type.type_}")
            print(f"Resource name: {processor_type.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to fetch processor types: {e}")
# [END documentai_v1beta3_documentprocessorservice_fetch_processor_types]
