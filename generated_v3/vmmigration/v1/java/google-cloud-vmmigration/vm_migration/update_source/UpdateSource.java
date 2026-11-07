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

package com.google.cloud.vmmigration.v1;

// [START vmmigration_v1_vmmigration_source_update]
import com.google.cloud.vmmigration.v1.Source;
import com.google.cloud.vmmigration.v1.SourceName;
import com.google.cloud.vmmigration.v1.VmMigrationClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateSource {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sourceId = "example-source-id";
    updateSource(projectId, locationId, sourceId);
  }

  public static void updateSource(String projectId, String locationId, String sourceId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      Source source =
          Source.newBuilder()
              .setName(SourceName.of(projectId, locationId, sourceId).toString())
              .setDescription("Updated source description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      Source response = client.updateSourceAsync(source, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated source: " + response.getName());
    }
  }
}
// [END vmmigration_v1_vmmigration_source_update]
