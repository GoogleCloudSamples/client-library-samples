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

// [START vectorsearch_v1_dataobjectservice_dataobject_update]
import com.google.cloud.vectorsearch.v1.DataObject;
import com.google.cloud.vectorsearch.v1.DataObjectServiceClient;
import com.google.protobuf.FieldMask;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;

public class UpdateDataObject {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String collectionId = "example-collection_id";
    String dataObjectId = "example-data_object_id";
    updateDataObject(projectId, locationId, collectionId, dataObjectId);
  }

  public static void updateDataObject(
      String projectId, String locationId, String collectionId, String dataObjectId)
      throws Exception {
    try (DataObjectServiceClient client = DataObjectServiceClient.create()) {
      String dataObjectName =
          String.format(
              "projects/%s/locations/%s/collections/%s/dataObjects/%s",
              projectId, locationId, collectionId, dataObjectId);

      Struct updatedData =
          Struct.newBuilder()
              .putFields(
                  "title",
                  Value.newBuilder().setStringValue("Updated Title").build())
              .build();

      DataObject dataObject =
          DataObject.newBuilder()
              .setName(dataObjectName)
              .setData(updatedData)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("data").build();

      DataObject response = client.updateDataObject(dataObject, updateMask);
      System.out.println("Updated DataObject: " + response.getName());
    }
  }
}
// [END vectorsearch_v1_dataobjectservice_dataobject_update]
