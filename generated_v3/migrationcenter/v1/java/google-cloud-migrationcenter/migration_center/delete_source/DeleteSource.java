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

// [START migrationcenter_v1_migrationcenter_source_delete]
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.SourceName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteSource {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sourceId = "example-source-id";
    deleteSource(projectId, locationId, sourceId);
  }

  public static void deleteSource(String projectId, String locationId, String sourceId)
      throws Exception {
    // Initialize client that will be automatically closed after use.
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name = SourceName.of(projectId, locationId, sourceId).toString();

      // DeleteSource is a long-running operation; wait for it to complete.
      client.deleteSourceAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted source: %s%n", name);
    }
  }
}
// [END migrationcenter_v1_migrationcenter_source_delete]
