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

// [START analyticshub_v1_analyticshubservice_listing_delete]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.ListingName;
import java.io.IOException;

public class DeleteListing {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    String listingId = "example-listing-id";
    deleteListing(projectId, locationId, dataExchangeId, listingId);
  }

  public static void deleteListing(
      String projectId, String locationId, String dataExchangeId, String listingId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String name = ListingName.of(projectId, locationId, dataExchangeId, listingId).toString();
      client.deleteListing(name);
      System.out.println("Listing deleted successfully: " + name);
    }
  }
}
// [END analyticshub_v1_analyticshubservice_listing_delete]
