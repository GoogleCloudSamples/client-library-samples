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

# [START documentai_v1_documentprocessor_processors_list_full]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1 as documentai

client = documentai.DocumentProcessorServiceClient()


def list_processors_full(
    project_id: str,
    location: str,
    page_size: int,
) -> None:
    """List processors with pagination.

    Lists the processors created in a project and location with pagination support.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        page_size: The maximum number of processors to return.
    """
    parent = f"projects/{project_id}/locations/{location}"

    request = documentai.ListProcessorsRequest(
        parent=parent,
        page_size=page_size,
    )

    try:
        page_result = client.list_processors(request=request)

        for processor in page_result:
            print(f"Processor Name: {processor.name}")
            print(f"  Display Name: {processor.display_name}")
            print(f"  Type: {processor.type}")
            print(f"  State: {processor.state.name}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Processors",
            file=sys.stderr,
        )


# [END documentai_v1_documentprocessor_processors_list_full]
