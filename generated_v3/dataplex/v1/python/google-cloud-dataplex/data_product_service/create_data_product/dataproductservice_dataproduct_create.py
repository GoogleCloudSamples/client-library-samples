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

# [START dataplex_v1_dataproductservice_dataproduct_create]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataProductServiceClient()


def create_data_product(
    location_id: str, data_product_id: str, project_id: str
) -> None:
    """Use the create_data_product method

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        data_product_id: The ID of the data product to create. Must conform to
          RFC-1034 (1-63 characters, lowercase letters, numbers, and hyphens,
          starting with a letter and ending with a letter or number).
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    data_product = dataplex_v1.DataProduct(
        display_name="Sample Data Product",
        owner_emails=["user@example.com"],
    )

    try:
        operation = client.create_data_product(
            parent=parent,
            data_product_id=data_product_id,
            data_product=data_product,
        )
        response = operation.result()
        print(f"Created data product: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create data product: {e}")


# [END dataplex_v1_dataproductservice_dataproduct_create]
