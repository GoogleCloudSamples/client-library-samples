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

# [START analyticshub_v1_analyticshubservice_listing_update]
from google.api_core import exceptions
from google.cloud import bigquery_analyticshub_v1
from google.protobuf import field_mask_pb2


def update_listing(
    project_id: str,
    location_id: str,
    data_exchange_id: str,
    listing_id: str,
) -> None:
    """Updates an Analytics Hub listing.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region (for example, "us").
        data_exchange_id: The ID of the parent data exchange containing the listing.
        listing_id: The ID of the listing to update.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()

    listing_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"dataExchanges/{data_exchange_id}/listings/{listing_id}"
    )

    listing = bigquery_analyticshub_v1.Listing(
        name=listing_name,
        description="Updated description for the listing.",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = bigquery_analyticshub_v1.UpdateListingRequest(
        listing=listing,
        update_mask=update_mask,
    )

    try:
        response = client.update_listing(request=request)
        print(f"Updated listing: {response.name}")
        print(f"Description: {response.description}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END analyticshub_v1_analyticshubservice_listing_update]
