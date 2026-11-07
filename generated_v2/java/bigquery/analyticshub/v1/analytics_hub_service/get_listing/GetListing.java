// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.analyticshub.v1;

// [START analyticshub_v1_analyticshubservice_listing_get]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.Listing;
import com.google.cloud.bigquery.analyticshub.v1.ListingName;
import java.io.IOException;

public class GetListing {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    String listingId = "example-listing-id";
    getListing(projectId, locationId, dataExchangeId, listingId);
  }

  public static void getListing(
      String projectId, String locationId, String dataExchangeId, String listingId)
      throws IOException {
    // Initialize the client with Application Default Credentials.
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String name = ListingName.of(projectId, locationId, dataExchangeId, listingId).toString();

      Listing listing = client.getListing(name);

      System.out.println("Listing retrieved successfully: " + listing.getName());
      System.out.println("Display name: " + listing.getDisplayName());
      System.out.println("State: " + listing.getState());
    }
  }
}
// [END analyticshub_v1_analyticshubservice_listing_get]
