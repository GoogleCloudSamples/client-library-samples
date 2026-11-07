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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_metadataservice_entities_list]
import com.google.cloud.dataplex.v1.Entity;
import com.google.cloud.dataplex.v1.ListEntitiesRequest;
import com.google.cloud.dataplex.v1.MetadataServiceClient;

public class ListEntities {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String zoneId = "example-zone_id";
    String projectId = "example-project_id";
    listEntities(locationId, lakeId, zoneId, projectId);
  }

  public static void listEntities(
      String locationId, String lakeId, String zoneId, String projectId) throws Exception {
    try (MetadataServiceClient client = MetadataServiceClient.create()) {
      ListEntitiesRequest.EntityView view = ListEntitiesRequest.EntityView.TABLES;
      String parent =
          String.format(
              "projects/%s/locations/%s/lakes/%s/zones/%s", projectId, locationId, lakeId, zoneId);

      ListEntitiesRequest request =
          ListEntitiesRequest.newBuilder().setParent(parent).setView(view).build();

      for (Entity entity : client.listEntities(request).iterateAll()) {
        System.out.println("Entity name: " + entity.getName());
      }
    }
  }
}
// [END dataplex_v1_metadataservice_entities_list]
