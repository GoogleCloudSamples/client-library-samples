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

# [START documentai_v1beta3_documentprocessor_evaluation_get]
import sys

from google.api_core import exceptions
from google.cloud import documentai_v1beta3 as documentai

client = documentai.DocumentProcessorServiceClient()


def get_evaluation(
    project_id: str,
    location: str,
    processor_id: str,
    version_id: str,
    evaluation_id: str,
) -> None:
    """Get evaluation.

    Gets details about a specific evaluation.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location.
        processor_id: The ID of the processor.
        version_id: The ID of the processor version.
        evaluation_id: The ID of the evaluation to retrieve.
    """
    name = f"projects/{project_id}/locations/{location}/processors/{processor_id}/processorVersions/{version_id}/evaluations/{evaluation_id}"

    request = documentai.GetEvaluationRequest(
        name=name,
    )

    try:
        response = client.get_evaluation(request=request)

        print(f"Evaluation Name: {response.name}")
        print(f"  F1 Score: {response.f1_score}")
        print(f"  Precision: {response.precision}")
        print(f"  Recall: {response.recall}")

    except exceptions.GoogleAPICallError as e:
        print(f"error: {e.message}", file=sys.stderr)
        print(
            f"Troubleshooting Context: Project: {project_id}, Location: {location} Resource Type: Evaluation, Resource ID: {evaluation_id}",
            file=sys.stderr,
        )


# [END documentai_v1beta3_documentprocessor_evaluation_get]
