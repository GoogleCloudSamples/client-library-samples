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

// [START analyticshub_v1beta1_analyticshubservice_listing_create]
import com.google.cloud.bigquery.dataexchange.v1beta1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.dataexchange.v1beta1.CreateListingRequest;
import com.google.cloud.bigquery.dataexchange.v1beta1.Listing;
import java.io.IOException;

public class CreateListing {

  public static void main(String[] args) throws IOException {
    String listingId = "example-listing-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    String datasetId = "example-dataset-id";
    createListing(listingId, projectId, locationId, dataExchangeId, datasetId);
  }

  public static void createListing(
      String listingId,
      String projectId,
      String locationId,
      String dataExchangeId,
      String datasetId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/dataExchanges/%s", projectId, locationId, dataExchangeId);
      Listing listing =
          Listing.newBuilder()
              .setDisplayName("Sample Listing")
              .setBigqueryDataset(
                  Listing.BigQueryDatasetSource.newBuilder()
                      .setDataset(String.format("projects/%s/datasets/%s", projectId, datasetId))
                      .build())
              .build();

      CreateListingRequest request =
          CreateListingRequest.newBuilder()
              .setParent(parent)
              .setListingId(listingId)
              .setListing(listing)
              .build();

      Listing response = client.createListing(request);
      System.out.println("Created listing: " + response.getName());
    }
  }
}
// [END analyticshub_v1beta1_analyticshubservice_listing_create]
