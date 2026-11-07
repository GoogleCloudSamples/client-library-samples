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

// [START dataplex_v1_catalogservice_aspecttype_get]
import com.google.cloud.dataplex.v1.AspectType;
import com.google.cloud.dataplex.v1.AspectTypeName;
import com.google.cloud.dataplex.v1.CatalogServiceClient;

public class GetAspectType {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    String aspectTypeId = "example-aspect_type_id";
    getAspectType(locationId, projectId, aspectTypeId);
  }

  public static void getAspectType(String locationId, String projectId, String aspectTypeId)
      throws Exception {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String name = AspectTypeName.of(projectId, locationId, aspectTypeId).toString();
      AspectType response = client.getAspectType(name);
      System.out.println("Retrieved aspect type: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_aspecttype_get]
