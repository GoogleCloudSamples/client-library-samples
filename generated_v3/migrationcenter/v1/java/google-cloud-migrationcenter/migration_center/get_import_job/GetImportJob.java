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

// [START migrationcenter_v1_migrationcenter_importjob_get]
import com.google.cloud.migrationcenter.v1.GetImportJobRequest;
import com.google.cloud.migrationcenter.v1.ImportJob;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import java.io.IOException;

public class GetImportJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String importJobId = "example-import_job_id";
    getImportJob(projectId, locationId, importJobId);
  }

  public static void getImportJob(String projectId, String locationId, String importJobId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/importJobs/%s", projectId, locationId, importJobId);

      GetImportJobRequest request = GetImportJobRequest.newBuilder().setName(name).build();
      ImportJob response = client.getImportJob(request);

      System.out.println("Import job name: " + response.getName());
      System.out.println("Import job state: " + response.getState());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_importjob_get]
