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

// [START vectorsearch_v1beta_dataobjectservice_dataobject_get]
import com.google.cloud.vectorsearch.v1beta.DataObject;
import com.google.cloud.vectorsearch.v1beta.DataObjectServiceClient;
import com.google.cloud.vectorsearch.v1beta.GetDataObjectRequest;

public class GetDataObject {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String collectionId = "example-collection_id";
    String dataObjectId = "example-data_object_id";
    getDataObject(projectId, locationId, collectionId, dataObjectId);
  }

  public static void getDataObject(
      String projectId, String locationId, String collectionId, String dataObjectId)
      throws Exception {
    try (DataObjectServiceClient client = DataObjectServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/collections/%s/dataObjects/%s",
              projectId, locationId, collectionId, dataObjectId);

      GetDataObjectRequest request = GetDataObjectRequest.newBuilder().setName(name).build();

      DataObject response = client.getDataObject(request);
      System.out.println("Data Object Name: " + response.getName());
    }
  }
}
// [END vectorsearch_v1beta_dataobjectservice_dataobject_get]
