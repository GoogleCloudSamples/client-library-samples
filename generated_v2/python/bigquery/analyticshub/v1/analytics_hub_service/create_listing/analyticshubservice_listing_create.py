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

# [START analyticshub_v1_analyticshubservice_listing_create]
import google.api_core.exceptions
from google.cloud import bigquery_analyticshub_v1


def create_listing(
    listing_id: str,
    project_id: str,
    location_id: str,
    data_exchange_id: str,
    dataset_id: str,
) -> None:
    """Creates a listing in an Analytics Hub data exchange.

    Args:
        listing_id: The identifier for the listing. Must contain only letters,
          numbers, and underscores (maximum 100 bytes).
        project_id: The Google Cloud project ID hosting the data exchange and
          BigQuery dataset.
        location_id: The Google Cloud region or multi-region (for example, 'us'
          or 'us-central1').
        data_exchange_id: The identifier of the existing DataExchange.
        dataset_id: The identifier of the BigQuery dataset to share in the
          listing.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()

    listing = bigquery_analyticshub_v1.Listing(
        display_name="Example Listing",
        description="Dataset shared via Analytics Hub",
        bigquery_dataset=bigquery_analyticshub_v1.Listing.BigQueryDatasetSource(
            dataset=f"projects/{project_id}/datasets/{dataset_id}"
        ),
    )
    parent = f"projects/{project_id}/locations/{location_id}/dataExchanges/{data_exchange_id}"

    request = bigquery_analyticshub_v1.CreateListingRequest(
        parent=parent,
        listing_id=listing_id,
        listing=listing,
    )

    try:
        response = client.create_listing(request=request)
        print(f"Created listing: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create listing: {e}")
# [END analyticshub_v1_analyticshubservice_listing_create]
