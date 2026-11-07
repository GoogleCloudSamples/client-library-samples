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

# [START biglake_v1_icebergcatalogservice_icebergcatalogs_list]
import google.api_core.exceptions
from google.cloud import biglake_v1


def list_iceberg_catalogs(project_id: str) -> None:
    """Lists Iceberg catalogs in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = biglake_v1.IcebergCatalogServiceClient()

    parent = f"projects/{project_id}"

    request = biglake_v1.ListIcebergCatalogsRequest(parent=parent)

    try:
        response = client.list_iceberg_catalogs(request=request)
        count = 0
        for catalog in response:
            print(f"Catalog name: {catalog.name}")
            count += 1
        print(f"Listed {count} Iceberg catalogs.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list Iceberg catalogs: {error}")
# [END biglake_v1_icebergcatalogservice_icebergcatalogs_list]
