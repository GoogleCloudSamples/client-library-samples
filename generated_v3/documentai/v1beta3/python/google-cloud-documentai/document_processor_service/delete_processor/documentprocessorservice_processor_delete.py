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

# [START documentai_v1beta3_documentprocessorservice_processor_delete]
import google.api_core.exceptions
from google.cloud import documentai_v1beta3

client = documentai_v1beta3.DocumentProcessorServiceClient()


def delete_processor(project_id: str, location_id: str, processor_id: str) -> None:
    """Deletes a Document AI processor.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Document AI location, for example, 'us' or 'eu'.
        processor_id: The server-generated ID of the processor to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/processors/{processor_id}"

    try:
        # DeleteProcessor is a long-running operation; wait for it to finish.
        operation = client.delete_processor(name=name)
        operation.result()
        print(f"Deleted processor: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete processor: {error}")
# [END documentai_v1beta3_documentprocessorservice_processor_delete]
