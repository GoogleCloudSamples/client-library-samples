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

# [START documentai_v1beta3_documentprocessorservice_review_document]
import google.api_core.exceptions
from google.cloud import documentai_v1beta3


def review_document(project_id: str, location_id: str, processor_id: str) -> None:
    """Sends a document for human review.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the Document AI processor (for example,
          'us' or 'eu').
        processor_id: The ID of the Document AI processor.
    """
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options={
            "api_endpoint": f"{location_id}-documentai.googleapis.com"
        }
    )

    human_review_config = (
        f"projects/{project_id}/locations/{location_id}/processors/"
        f"{processor_id}/humanReviewConfig"
    )
    inline_document = documentai_v1beta3.Document(
        text="Sample document text for human review."
    )

    request = documentai_v1beta3.ReviewDocumentRequest(
        human_review_config=human_review_config,
        inline_document=inline_document,
    )

    try:
        operation = client.review_document(request=request)
        response = operation.result()
        print(
            f"Review operation completed. Document destination: {response.gcs_destination}"
        )
    except (
        google.api_core.exceptions.BadRequest,
        google.api_core.exceptions.InvalidArgument,
    ):
        print(
            f"Human review requires configuration on processor: {processor_id}."
        )
# [END documentai_v1beta3_documentprocessorservice_review_document]
