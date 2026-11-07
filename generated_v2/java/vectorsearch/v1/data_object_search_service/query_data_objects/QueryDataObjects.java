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

// [START vectorsearch_v1_dataobjectsearchservice_query_data_objects]
import com.google.cloud.vectorsearch.v1.DataObjectSearchServiceClient;
import com.google.cloud.vectorsearch.v1.DataObjectSearchServiceClient.QueryDataObjectsPagedResponse;
import com.google.cloud.vectorsearch.v1.QueryDataObjectsRequest;

public class QueryDataObjects {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String collectionId = "example-collection-id";
    queryDataObjects(projectId, locationId, collectionId);
  }

  public static void queryDataObjects(String projectId, String locationId, String collectionId)
      throws Exception {
    try (DataObjectSearchServiceClient client = DataObjectSearchServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);

      QueryDataObjectsRequest request =
          QueryDataObjectsRequest.newBuilder()
              .setParent(parent)
              .build();

      QueryDataObjectsPagedResponse response = client.queryDataObjects(request);
      System.out.println("Query executed successfully.");
      for (Object element : response.iterateAll()) {
        System.out.println("Data object: " + element);
      }
    }
  }
}
// [END vectorsearch_v1_dataobjectsearchservice_query_data_objects]
