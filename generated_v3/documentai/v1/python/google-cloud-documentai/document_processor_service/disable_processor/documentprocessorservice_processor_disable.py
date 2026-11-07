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

# [START documentai_v1_documentprocessorservice_disable_processor]
import google.api_core.exceptions
from google.cloud import documentai_v1

client = documentai_v1.DocumentProcessorServiceClient()


def disable_processor(project_id: str, location_id: str, processor_id: str) -> None:
    """Disables a Document AI processor.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region for the processor (for example, 'us' or 'eu').
        processor_id: The ID of the processor to disable.
    """
    name = client.processor_path(project_id, location_id, processor_id)

    request = documentai_v1.DisableProcessorRequest(name=name)

    try:
        operation = client.disable_processor(request=request)
        operation.result()
        print(f"Disabled processor: {name}")
    except (
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.GoogleAPICallError,
    ) as error:
        print(f"Failed to disable processor: {error}")
# [END documentai_v1_documentprocessorservice_disable_processor]
