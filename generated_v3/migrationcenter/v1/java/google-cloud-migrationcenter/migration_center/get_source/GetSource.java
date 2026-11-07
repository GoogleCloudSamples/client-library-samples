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

package com.google.cloud.migrationcenter.v1;

// [START migrationcenter_v1_migrationcenter_source_get]
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.Source;
import com.google.cloud.migrationcenter.v1.SourceName;
import java.io.IOException;

public class GetSource {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sourceId = "example-source_id";
    getSource(projectId, locationId, sourceId);
  }

  public static void getSource(String projectId, String locationId, String sourceId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name = SourceName.of(projectId, locationId, sourceId).toString();

      Source response = client.getSource(name);

      System.out.println("Source retrieved successfully: " + response.getName());
      System.out.println("State: " + response.getState());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_source_get]
