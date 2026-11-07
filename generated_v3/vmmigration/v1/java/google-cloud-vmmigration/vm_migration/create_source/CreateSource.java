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

// [START vmmigration_v1_vmmigration_source_create]
import com.google.cloud.vmmigration.v1.Source;
import com.google.cloud.vmmigration.v1.VmMigrationClient;
import com.google.cloud.vmmigration.v1.VmwareSourceDetails;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateSource {

  public static void main(String[] args) throws Exception {
    // Provide a unique identifier starting with a lowercase letter (lowercase letters and digits).
    String sourceId = "examplesourceid";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createSource(sourceId, projectId, locationId);
  }

  public static void createSource(String sourceId, String projectId, String locationId)
      throws IOException, ExecutionException, InterruptedException {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      VmwareSourceDetails vmwareSourceDetails =
          VmwareSourceDetails.newBuilder()
              .setUsername("example-username")
              .setPassword("example-password")
              .setVcenterIp("192.168.1.1")
              .build();

      Source source =
          Source.newBuilder()
              .setDescription("Migration source environment")
              .setVmware(vmwareSourceDetails)
              .build();

      // Wait for the long-running operation to complete.
      Source response = client.createSourceAsync(parent, source, sourceId).get();
      System.out.println("Source created successfully: " + response.getName());
    }
  }
}
// [END vmmigration_v1_vmmigration_source_create]
