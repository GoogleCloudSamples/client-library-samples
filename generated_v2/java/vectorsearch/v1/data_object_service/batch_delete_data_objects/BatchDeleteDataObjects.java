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

// [START vectorsearch_v1_dataobjectservice_dataobjects_batchdelete]
import com.google.cloud.vectorsearch.v1.DataObjectServiceClient;
import com.google.cloud.vectorsearch.v1.DeleteDataObjectRequest;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class BatchDeleteDataObjects {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String collectionId = "example-collection-id";
    String dataObjectId = "example-data-object-id";
    batchDeleteDataObjects(projectId, locationId, collectionId, dataObjectId);
  }

  public static void batchDeleteDataObjects(
      String projectId, String locationId, String collectionId, String dataObjectId)
      throws IOException {
    // Initialize the client using Application Default Credentials (ADC)
    try (DataObjectServiceClient client = DataObjectServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);

      DeleteDataObjectRequest deleteDataObjectRequest =
          DeleteDataObjectRequest.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/collections/%s/dataObjects/%s",
                      projectId, locationId, collectionId, dataObjectId))
              .build();

      List<DeleteDataObjectRequest> requests = Collections.singletonList(deleteDataObjectRequest);

      client.batchDeleteDataObjects(parent, requests);
      System.out.println("Batch delete completed successfully.");
    }
  }
}
// [END vectorsearch_v1_dataobjectservice_dataobjects_batchdelete]
