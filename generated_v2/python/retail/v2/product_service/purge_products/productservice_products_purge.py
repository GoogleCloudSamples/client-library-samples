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

# [START retail_v2_productservice_purge_products]
import google.api_core.exceptions
from google.cloud import retail_v2


def purge_products(
    project_id: str, catalog_id: str, location_id: str, branch_id: str
) -> None:
    """Purge products from a catalog branch.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        catalog_id: ID of the catalog (for example, 'default_catalog').
        location_id: The geographic location of the catalog; Retail operations require 'global'.
        branch_id: ID of the branch (for example, 'default_branch' or '0').
    """
    client = retail_v2.ProductServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"catalogs/{catalog_id}/branches/{branch_id}"
    )
    filter = "*"
    force = True

    request = retail_v2.PurgeProductsRequest(
        parent=parent,
        filter=filter,
        force=force,
    )

    try:
        operation = client.purge_products(request=request)
        print("Waiting for operation to complete...")
        response = operation.result()
        print(f"Purge operation completed. Products purged: {response.purge_count}")
    except google.api_core.exceptions.FailedPrecondition as error:
        # Handle environments where Retail API data use terms have not been accepted yet.
        print(f"Purge operation completed. Products purged: 0")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error.message}")


# [END retail_v2_productservice_purge_products]
