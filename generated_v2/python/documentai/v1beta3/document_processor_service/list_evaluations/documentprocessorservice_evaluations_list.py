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

# [START documentai_v1beta3_documentprocessorservice_evaluations_list]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import documentai_v1beta3


def list_evaluations(
    project_id: str,
    location_id: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """Lists evaluations for a processor version.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or multi-region (for example, 'us').
        processor_id: The ID of the processor (for example, 'example-processor-id').
        processor_version_id: The ID of the processor version (for example, 'example-processor-version-id').
    """
    client_options = ClientOptions(
        api_endpoint=f"{location_id}-documentai.googleapis.com"
    )
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=client_options
    )

    parent = client.processor_version_path(
        project_id, location_id, processor_id, processor_version_id
    )

    request = documentai_v1beta3.ListEvaluationsRequest(parent=parent)

    try:
        response = client.list_evaluations(request=request)
        evaluations_found = False
        for evaluation in response:
            print(f"Evaluation name: {evaluation.name}")
            evaluations_found = True
        if not evaluations_found:
            print("No evaluations found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list evaluations: {error}")
# [END documentai_v1beta3_documentprocessorservice_evaluations_list]
