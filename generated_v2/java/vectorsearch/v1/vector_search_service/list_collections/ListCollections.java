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

// [START vectorsearch_v1_vectorsearchservice_collections_list]
import com.google.cloud.vectorsearch.v1.Collection;
import com.google.cloud.vectorsearch.v1.ListCollectionsRequest;
import com.google.cloud.vectorsearch.v1.VectorSearchServiceClient;
import java.io.IOException;

public class ListCollections {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listCollections(projectId, locationId);
  }

  public static void listCollections(String projectId, String locationId) throws Exception {
    try (VectorSearchServiceClient client = VectorSearchServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListCollectionsRequest request =
          ListCollectionsRequest.newBuilder().setParent(parent).build();

      for (Collection collection : client.listCollections(request).iterateAll()) {
        System.out.println("Collection name: " + collection.getName());
      }
    }
  }
}
// [END vectorsearch_v1_vectorsearchservice_collections_list]
