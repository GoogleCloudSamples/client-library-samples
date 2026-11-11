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

// [START vectorsearch_v1_dataobjectservice_dataobject_create]
import com.google.cloud.vectorsearch.v1.CreateDataObjectRequest;
import com.google.cloud.vectorsearch.v1.DataObject;
import com.google.cloud.vectorsearch.v1.DataObjectServiceClient;

public class CreateDataObject {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String collectionId = "example-collection-id";
    String dataObjectId = "example-data-object-id";
    createDataObject(projectId, locationId, collectionId, dataObjectId);
  }

  public static void createDataObject(
      String projectId, String locationId, String collectionId, String dataObjectId)
      throws Exception {
    try (DataObjectServiceClient client = DataObjectServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/collections/%s", projectId, locationId, collectionId);
      DataObject dataObject = DataObject.newBuilder().build();

      CreateDataObjectRequest request =
          CreateDataObjectRequest.newBuilder()
              .setParent(parent)
              .setDataObjectId(dataObjectId)
              .setDataObject(dataObject)
              .build();

      DataObject response = client.createDataObject(request);
      System.out.println("Created data object: " + response.getName());
    }
  }
}
// [END vectorsearch_v1_dataobjectservice_dataobject_create]
