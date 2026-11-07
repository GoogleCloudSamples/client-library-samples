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

// [START dataplex_v1_catalogservice_aspecttype_update]
import com.google.cloud.dataplex.v1.AspectType;
import com.google.cloud.dataplex.v1.AspectTypeName;
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateAspectType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String aspectTypeId = "example-aspect_type_id";
    updateAspectType(projectId, locationId, aspectTypeId);
  }

  public static void updateAspectType(String projectId, String locationId, String aspectTypeId)
      throws Exception {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      AspectType aspectType =
          AspectType.newBuilder()
              .setName(AspectTypeName.of(projectId, locationId, aspectTypeId).toString())
              .setDescription("Updated description")
              .build();

      // Initiate the update operation and wait for completion
      AspectType response =
          client.updateAspectTypeAsync(aspectType, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated aspect type: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_aspecttype_update]
