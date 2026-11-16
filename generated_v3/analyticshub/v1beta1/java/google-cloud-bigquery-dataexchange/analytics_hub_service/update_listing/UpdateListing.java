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

package com.google.cloud.analyticshub.v1beta1;

// [START analyticshub_v1beta1_analyticshubservice_listing_update]
import com.google.cloud.bigquery.dataexchange.v1beta1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.dataexchange.v1beta1.Listing;
import com.google.cloud.bigquery.dataexchange.v1beta1.UpdateListingRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateListing {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    String listingId = "example-listing-id";
    updateListing(projectId, locationId, dataExchangeId, listingId);
  }

  public static void updateListing(
      String projectId, String locationId, String dataExchangeId, String listingId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      Listing listing =
          Listing.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/dataExchanges/%s/listings/%s",
                      projectId, locationId, dataExchangeId, listingId))
              .setDescription("Updated listing description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      UpdateListingRequest request =
          UpdateListingRequest.newBuilder()
              .setListing(listing)
              .setUpdateMask(updateMask)
              .build();

      Listing response = client.updateListing(request);
      System.out.println("Updated listing: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END analyticshub_v1beta1_analyticshubservice_listing_update]
