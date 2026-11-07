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

package com.google.cloud.vectorsearch.v1beta;

// [START vectorsearch_v1beta_dataobjectsearchservice_batch_search_data_objects]
import com.google.cloud.vectorsearch.v1beta.BatchSearchDataObjectsRequest;
import com.google.cloud.vectorsearch.v1beta.BatchSearchDataObjectsResponse;
import com.google.cloud.vectorsearch.v1beta.DataObjectSearchServiceClient;
import com.google.cloud.vectorsearch.v1beta.DenseVector;
import com.google.cloud.vectorsearch.v1beta.Search;
import com.google.cloud.vectorsearch.v1beta.VectorSearch;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class BatchSearchDataObjects {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String collectionId = "example-collection-id";
    batchSearchDataObjects(projectId, locationId, collectionId);
  }

  public static void batchSearchDataObjects(
      String projectId, String locationId, String collectionId) throws IOException {
    // Initialize client within a try-with-resources block for automatic resource management
    try (DataObjectSearchServiceClient client = DataObjectSearchServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);

      DenseVector denseVector =
          DenseVector.newBuilder()
              .addValues(0.1f)
              .addValues(0.2f)
              .addValues(0.3f)
              .build();

      VectorSearch vectorSearch =
          VectorSearch.newBuilder()
              .setSearchField("embedding")
              .setVector(denseVector)
              .build();

      Search search = Search.newBuilder().setVectorSearch(vectorSearch).build();
      List<Search> searches = Arrays.asList(search);

      BatchSearchDataObjectsRequest request =
          BatchSearchDataObjectsRequest.newBuilder()
              .setParent(parent)
              .addAllSearches(searches)
              .build();

      BatchSearchDataObjectsResponse response = client.batchSearchDataObjects(request);

      System.out.println("Batch search completed successfully.");
      System.out.println(response);
    }
  }
}
// [END vectorsearch_v1beta_dataobjectsearchservice_batch_search_data_objects]
