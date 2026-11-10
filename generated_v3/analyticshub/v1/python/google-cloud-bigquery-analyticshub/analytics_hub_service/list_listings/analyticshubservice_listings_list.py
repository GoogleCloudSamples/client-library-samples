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

# [START analyticshub_v1_analyticshubservice_listings_list]
from google.api_core import exceptions
from google.cloud import bigquery_analyticshub_v1


def list_listings(project_id: str, location_id: str, data_exchange_id: str) -> None:
    """Lists listings in a BigQuery Analytics Hub data exchange.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location for the data exchange (for example, 'us').
        data_exchange_id: The ID of the data exchange.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/dataExchanges/{data_exchange_id}"
    )

    request = bigquery_analyticshub_v1.ListListingsRequest(parent=parent)

    try:
        response = client.list_listings(request=request)
        for listing in response:
            print(f"Listing name: {listing.name}")
            print(f"Display name: {listing.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Request failed with API error: {error}")
# [END analyticshub_v1_analyticshubservice_listings_list]
