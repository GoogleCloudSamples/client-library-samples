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

# [START analyticshub_v1beta1_analyticshubservice_listing_update]
import google.api_core.exceptions
from google.cloud import bigquery_data_exchange_v1beta1
from google.protobuf import field_mask_pb2


def update_listing(
    project_id: str, location_id: str, data_exchange_id: str, listing_id: str
) -> None:
    """Updates an existing listing in an Analytics Hub data exchange.

    Args:
        project_id: The Google Cloud project ID hosting the Analytics Hub data
          exchange and listing.
        location_id: The Google Cloud region or multi-region of the data
          exchange and listing (for example, 'us' or 'us-central1').
        data_exchange_id: The ID of the data exchange containing the listing.
          Must contain only letters, numbers, and underscores.
        listing_id: The ID of the listing to update. Must contain only letters,
          numbers, and underscores.
    """
    client = bigquery_data_exchange_v1beta1.AnalyticsHubServiceClient()

    listing = bigquery_data_exchange_v1beta1.Listing(
        name=(
            f"projects/{project_id}/locations/{location_id}"
            f"/dataExchanges/{data_exchange_id}/listings/{listing_id}"
        ),
        description="Updated listing description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_listing(
            listing=listing,
            update_mask=update_mask,
        )
        print(f"Updated listing: {response.name}")
        print(f"Listing description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END analyticshub_v1beta1_analyticshubservice_listing_update]
