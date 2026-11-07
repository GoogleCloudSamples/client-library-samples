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

// [START vmmigration_v1_vmmigration_source_get]
import com.google.cloud.vmmigration.v1.Source;
import com.google.cloud.vmmigration.v1.SourceName;
import com.google.cloud.vmmigration.v1.VmMigrationClient;
import java.io.IOException;

public class GetSource {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sourceId = "example-source_id";
    getSource(projectId, locationId, sourceId);
  }

  public static void getSource(String projectId, String locationId, String sourceId)
      throws Exception {
    // Initialize client that will be closed automatically with try-with-resources
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String name = SourceName.of(projectId, locationId, sourceId).toString();

      Source source = client.getSource(name);

      System.out.println("Retrieved Source: " + source.getName());
      System.out.println("Description: " + source.getDescription());
    }
  }
}
// [END vmmigration_v1_vmmigration_source_get]
