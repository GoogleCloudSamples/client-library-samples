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

# [START documentai_v1beta3_documentprocessor_processortypes_list_full]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1beta3 as documentai

client = documentai.DocumentProcessorServiceClient()


def list_processor_types_full(
    project_id: str,
    location: str,
    page_size: int,
) -> None:
    """List processor types with pagination.

    Lists the processor types available with pagination support.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        page_size: The maximum number of processor types to return.
    """
    parent = f"projects/{project_id}/locations/{location}"

    request = documentai.ListProcessorTypesRequest(
        parent=parent,
        page_size=page_size,
    )

    try:
        page_result = client.list_processor_types(request=request)

        for processor_type in page_result:
            print(f"Processor Type: {processor_type.type}")
            print(f"  Name: {processor_type.name}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: ProcessorTypes",
            file=sys.stderr,
        )


# [END documentai_v1beta3_documentprocessor_processortypes_list_full]
