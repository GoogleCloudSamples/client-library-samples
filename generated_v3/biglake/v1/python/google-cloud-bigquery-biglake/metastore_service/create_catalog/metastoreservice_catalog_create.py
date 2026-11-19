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

# [START biglake_v1_metastoreservice_catalog_create]
import google.api_core.exceptions
from google.cloud import bigquery_biglake_v1


def create_catalog(location_id: str, catalog_id: str, project_id: str) -> None:
    """Creates a BigLake catalog in a specified Google Cloud project and location.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        catalog_id: Caller-chosen ID to assign to the new catalog (for example,
          'example_catalog').
        project_id: The Google Cloud project ID.
    """
    client = bigquery_biglake_v1.MetastoreServiceClient()

    catalog = bigquery_biglake_v1.Catalog()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.create_catalog(
            parent=parent,
            catalog=catalog,
            catalog_id=catalog_id,
        )
        print(f"Created catalog: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create catalog: {error}")


# [END biglake_v1_metastoreservice_catalog_create]
