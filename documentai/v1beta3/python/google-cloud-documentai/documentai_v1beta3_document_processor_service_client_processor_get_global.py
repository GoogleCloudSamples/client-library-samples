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

# [START documentai_v1beta3_documentprocessor_get]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1beta3 as documentai

client = documentai.DocumentProcessorServiceClient()


def get_processor(
    project_id: str,
    location: str,
    processor_id: str,
) -> None:
    """Get processor.

    Gets details about a specific processor.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor to retrieve.
    """
    name = client.processor_path(project_id, location, processor_id)

    request = documentai.GetProcessorRequest(
        name=name,
    )

    try:
        response = client.get_processor(request=request)

        print(f"Processor Name: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Type: {response.type}")
        print(f"  State: {response.state.name}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Processor, Resource ID: {processor_id}",
            file=sys.stderr,
        )


# [END documentai_v1beta3_documentprocessor_get]
