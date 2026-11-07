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

# [START databasecenter_v1beta_databasecenter_query_products]
import google.api_core.exceptions
from google.cloud import databasecenter_v1beta

client = databasecenter_v1beta.DatabaseCenterClient()


def query_products(project_id: str) -> None:
    """Queries database products for a project.

    Args:
        project_id: Google Cloud project ID, for example 'example-project-id'.
    """
    parent = f"projects/{project_id}"

    request = databasecenter_v1beta.QueryProductsRequest(
        parent=parent,
    )

    try:
        response = client.query_products(request=request)
        for product in response:
            print(product)
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to query products: {exc}")
# [END databasecenter_v1beta_databasecenter_query_products]
