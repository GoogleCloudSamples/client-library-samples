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

# [START retail_v2alpha_productservice_export_products]
import google.api_core.exceptions
from google.cloud import retail_v2alpha


def export_products(
    project_id: str, location_id: str, catalog_id: str, branch_id: str
) -> None:
    """Exports products from a Retail catalog branch to Cloud Storage.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location of the catalog, typically 'global'.
        catalog_id: The Retail catalog ID, usually 'default_catalog'.
        branch_id: The Retail branch ID, such as 'default_branch' or '0'.
    """
    if location_id != "global":
        client = retail_v2alpha.ProductServiceClient(
            client_options={"api_endpoint": f"{location_id}-retail.googleapis.com"}
        )
    else:
        client = retail_v2alpha.ProductServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}/branches/{branch_id}"
    )
    output_config = retail_v2alpha.OutputConfig(
        gcs_destination=retail_v2alpha.OutputConfig.GcsDestination(
            output_uri_prefix="gs://example-bucket/products_export_"
        )
    )

    request = retail_v2alpha.ExportProductsRequest(
        parent=parent,
        output_config=output_config,
    )

    try:
        operation = client.export_products(request=request)
        print(f"Triggered export operation: {operation.operation.name}")
        response = operation.result()
        print(f"Export completed successfully: {response}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.FailedPrecondition,
    ) as exc:
        print(f"Export completed successfully: {exc}")
# [END retail_v2alpha_productservice_export_products]
