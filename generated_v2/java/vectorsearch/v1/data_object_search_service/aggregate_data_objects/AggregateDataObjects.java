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

package com.google.cloud.vectorsearch.v1;

// [START vectorsearch_v1_dataobjectsearchservice_aggregate_data_objects]
import com.google.cloud.vectorsearch.v1.AggregateDataObjectsRequest;
import com.google.cloud.vectorsearch.v1.AggregateDataObjectsResponse;
import com.google.cloud.vectorsearch.v1.AggregationMethod;
import com.google.cloud.vectorsearch.v1.DataObjectSearchServiceClient;
import java.io.IOException;

public class AggregateDataObjects {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String collectionId = "example-collection-id";
    aggregateDataObjects(projectId, locationId, collectionId);
  }

  public static void aggregateDataObjects(
      String projectId, String locationId, String collectionId) throws Exception {
    // Initialize client that will be automatically closed after use
    try (DataObjectSearchServiceClient client = DataObjectSearchServiceClient.create()) {
      AggregationMethod aggregate = AggregationMethod.COUNT;
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);

      AggregateDataObjectsRequest request =
          AggregateDataObjectsRequest.newBuilder()
              .setParent(parent)
              .setAggregate(aggregate)
              .build();

      AggregateDataObjectsResponse response = client.aggregateDataObjects(request);
      System.out.println("Data objects aggregated successfully: " + response);
    }
  }
}
// [END vectorsearch_v1_dataobjectsearchservice_aggregate_data_objects]
