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

# [START documentai_v1beta3_document_datasetschema_get_full]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1beta3 as documentai

client = documentai.DocumentServiceClient()


def get_dataset_schema_full(
    project_id: str,
    location: str,
    processor_id: str,
) -> None:
    """Get dataset schema (Full).

    Retrieves the full schema of a dataset with detailed configuration.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor.
    """
    # Create the full resource name of the dataset schema
    name = f"projects/{project_id}/locations/{location}/processors/{processor_id}/dataset/datasetSchema"

    request = documentai.GetDatasetSchemaRequest(
        name=name,
    )

    try:
        response = client.get_dataset_schema(request=request)

        print(f"Dataset Schema Name: {response.name}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: DatasetSchema, Resource ID: {processor_id}",
            file=sys.stderr,
        )


# [END documentai_v1beta3_document_datasetschema_get_full]
