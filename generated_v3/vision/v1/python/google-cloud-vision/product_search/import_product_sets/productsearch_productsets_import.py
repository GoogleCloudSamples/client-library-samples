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

# [START vision_v1_productsearch_import_product_sets]
import google.api_core.exceptions
from google.cloud import vision_v1


def import_product_sets(project_id: str, location_id: str) -> None:
    """Import product sets from a Google Cloud Storage CSV file.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or location ID (for example, 'us-east1').
    """
    # Cloud Vision Product Search is supported in us-west1, us-east1, asia-east1, and europe-west1.
    supported_locations = {"us-west1", "us-east1", "asia-east1", "europe-west1"}
    if location_id not in supported_locations:
        location_id = "us-east1"

    client = vision_v1.ProductSearchClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    input_config = vision_v1.ImportProductSetsInputConfig(
        gcs_source=vision_v1.ImportProductSetsGcsSource(
            csv_file_uri="gs://cloud-samples-data/vision/product_search/product_sets.csv"
        )
    )

    try:
        operation = client.import_product_sets(
            parent=parent, input_config=input_config
        )
        print(f"Operation started: {operation.operation.name}")

        response = operation.result()
        print("Import operation completed.")
        for status in response.statuses:
            print(f"Status code: {status.code}, message: {status.message}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END vision_v1_productsearch_import_product_sets]
