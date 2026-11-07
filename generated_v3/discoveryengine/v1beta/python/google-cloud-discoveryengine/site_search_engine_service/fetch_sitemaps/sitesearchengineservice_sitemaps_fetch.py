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

# [START discoveryengine_v1beta_sitesearchengineservice_fetch_sitemaps]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.SiteSearchEngineServiceClient()


def fetch_sitemaps(
    project_id: str, location_id: str, collection_id: str, data_store_id: str
) -> None:
    """Fetches sitemaps associated with a target site search engine.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        collection_id: ID of the collection (for example, 'example-collection-id').
        data_store_id: ID of the data store (for example, 'example-datastore-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}/collections/{collection_id}/dataStores/{data_store_id}/siteSearchEngine"

    request = discoveryengine_v1beta.FetchSitemapsRequest(
        parent=parent,
    )

    try:
        response = client.fetch_sitemaps(request=request)
        for sitemap_metadata in response.sitemaps_metadata:
            print(f"Sitemap: {sitemap_metadata.sitemap}")
        print(f"Fetched {len(response.sitemaps_metadata)} sitemap(s) successfully.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed with API error: {error}")
# [END discoveryengine_v1beta_sitesearchengineservice_fetch_sitemaps]
