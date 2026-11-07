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

// [START migrationcenter_v1_migrationcenter_importjob_create]
import com.google.cloud.migrationcenter.v1.ImportJob;
import com.google.cloud.migrationcenter.v1.LocationName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.SourceName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateImportJob {

  public static void main(String[] args) throws Exception {
    String importJobId = "example-import_job_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sourceId = "example-source_id";
    createImportJob(importJobId, projectId, locationId, sourceId);
  }

  public static void createImportJob(
      String importJobId, String projectId, String locationId, String sourceId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      String assetSource = SourceName.of(projectId, locationId, sourceId).toString();
      ImportJob importJob =
          ImportJob.newBuilder()
              .setAssetSource(assetSource)
              .setDisplayName("Example Import Job")
              .build();

      ImportJob response = client.createImportJobAsync(parent, importJob, importJobId).get();
      System.out.println("Created import job: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_importjob_create]
