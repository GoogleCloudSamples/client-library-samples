# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START documentai_v1beta3_documentservice_list_documents]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1beta3


def list_documents(project_id: str, location: str, processor_id: str) -> None:
    """Lists documents in a Document AI dataset.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us").
        processor_id: The ID of the processor associated with the dataset.
    """
    client = documentai_v1beta3.DocumentServiceClient()

    dataset_name = client.dataset_path(project_id, location, processor_id)

    print(f"Listing documents for dataset: {dataset_name}")

    try:
        request = documentai_v1beta3.ListDocumentsRequest(
            dataset=dataset_name,
            page_size=10,
        )

        page_result = client.list_documents(request=request)

        found_documents = False
        for i, document_metadata in enumerate(page_result):
            found_documents = True
            print(f"--- Document {i+1} ---")

            if document_metadata.document_id.gcs_managed_doc_id:
                print(f"  Document ID (gcs managed): {document_metadata.document_id.gcs_managed_doc_id}")

            if document_metadata.document_id.unmanaged_doc_id:
                print(f"  Document ID (unmanaged): {document_metadata.document_id.unmanaged_doc_id.doc_id}")

            print(f"  Display Name: {document_metadata.display_name}")
            print(f"  Page Count: {document_metadata.page_count}")
            print(f"  Dataset Type: {document_metadata.dataset_type.name}")
            print(f"  Labeling State: {document_metadata.labeling_state.name}")

        if not found_documents:
            print(f"No documents found in dataset: {dataset_name}")

    except NotFound as e:
        print(
            "Error: Dataset or Processor not found. Please ensure the dataset path is correct."
            f" Dataset: {dataset_name}"
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1beta3_documentservice_list_documents]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists documents in a Document AI dataset."
    )
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor (e.g., 'us').",
        required=True,
    )
    parser.add_argument(
        "--processor_id",
        type=str,
        help="The ID of the processor associated with the dataset.",
        required=True,
    )

    args = parser.parse_args()

    list_documents(
        args.project_id,
        args.location,
        args.processor_id,
    )
