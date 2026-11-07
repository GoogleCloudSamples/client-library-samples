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

// [START migrationcenter_v1_migrationcenter_importdatafile_get]
import com.google.cloud.migrationcenter.v1.GetImportDataFileRequest;
import com.google.cloud.migrationcenter.v1.ImportDataFile;
import com.google.cloud.migrationcenter.v1.ImportDataFileName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import java.io.IOException;

public class GetImportDataFile {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String importJobId = "example-import_job_id";
    String importDataFileId = "example-import_data_file_id";
    getImportDataFile(projectId, locationId, importJobId, importDataFileId);
  }

  public static void getImportDataFile(
      String projectId, String locationId, String importJobId, String importDataFileId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name =
          ImportDataFileName.of(projectId, locationId, importJobId, importDataFileId).toString();

      GetImportDataFileRequest request =
          GetImportDataFileRequest.newBuilder().setName(name).build();

      ImportDataFile response = client.getImportDataFile(request);

      System.out.println("Import data file: " + response.getName());
      System.out.println("State: " + response.getState());
      System.out.println("Format: " + response.getFormat());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_importdatafile_get]
