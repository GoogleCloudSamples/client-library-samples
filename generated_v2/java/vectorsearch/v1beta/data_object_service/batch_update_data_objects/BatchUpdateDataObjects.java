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

// [START vectorsearch_v1beta_dataobjectservice_dataobjects_batchupdate]
import com.google.cloud.vectorsearch.v1beta.BatchUpdateDataObjectsRequest;
import com.google.cloud.vectorsearch.v1beta.BatchUpdateDataObjectsResponse;
import com.google.cloud.vectorsearch.v1beta.DataObject;
import com.google.cloud.vectorsearch.v1beta.DataObjectServiceClient;
import com.google.cloud.vectorsearch.v1beta.UpdateDataObjectRequest;
import com.google.protobuf.FieldMask;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class BatchUpdateDataObjects {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String collectionId = "example-collection_id";
    String dataObjectId = "example-data_object_id";
    batchUpdateDataObjects(projectId, locationId, collectionId, dataObjectId);
  }

  public static void batchUpdateDataObjects(
      String projectId, String locationId, String collectionId, String dataObjectId)
      throws IOException {
    // Initialize the client with Application Default Credentials
    try (DataObjectServiceClient client = DataObjectServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);

      FieldMask updateMask = FieldMask.newBuilder().addPaths("data").build();

      DataObject dataObject =
          DataObject.newBuilder()
              .setName(String.format("%s/dataObjects/%s", parent, dataObjectId))
              .setData(
                  Struct.newBuilder()
                      .putFields(
                          "status", Value.newBuilder().setStringValue("updated").build())
                      .build())
              .build();

      List<UpdateDataObjectRequest> requests =
          Collections.singletonList(
              UpdateDataObjectRequest.newBuilder()
                  .setDataObject(dataObject)
                  .setUpdateMask(updateMask)
                  .build());

      BatchUpdateDataObjectsRequest request =
          BatchUpdateDataObjectsRequest.newBuilder()
              .setParent(parent)
              .addAllRequests(requests)
              .build();

      BatchUpdateDataObjectsResponse response = client.batchUpdateDataObjects(request);
      System.out.println("Batch updated DataObjects successfully: " + dataObject.getName());
    }
  }
}
// [END vectorsearch_v1beta_dataobjectservice_dataobjects_batchupdate]
