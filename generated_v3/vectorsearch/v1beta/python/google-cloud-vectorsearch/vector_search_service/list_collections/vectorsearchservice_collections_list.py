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

# [START vectorsearch_v1beta_vectorsearchservice_collections_list]
import google.api_core.exceptions
from google.cloud import vectorsearch_v1beta

client = vectorsearch_v1beta.VectorSearchServiceClient()


def list_collections(project_id: str, location_id: str) -> None:
    """Lists collections in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region, for example, "us-central1".
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = vectorsearch_v1beta.ListCollectionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_collections(request=request)
        for collection in page_result:
            print(f"Collection name: {collection.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e}")
# [END vectorsearch_v1beta_vectorsearchservice_collections_list]
