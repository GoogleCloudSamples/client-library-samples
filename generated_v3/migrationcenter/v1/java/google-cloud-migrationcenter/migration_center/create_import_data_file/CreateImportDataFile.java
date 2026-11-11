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

// [START migrationcenter_v1_migrationcenter_importdatafile_create]
import com.google.cloud.migrationcenter.v1.ImportDataFile;
import com.google.cloud.migrationcenter.v1.ImportJobFormat;
import com.google.cloud.migrationcenter.v1.ImportJobName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateImportDataFile {

  public static void main(String[] args) throws Exception {
    String importDataFileId = "example-import_data_file_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String importJobId = "example-import_job_id";
    createImportDataFile(importDataFileId, projectId, locationId, importJobId);
  }

  public static void createImportDataFile(
      String importDataFileId, String projectId, String locationId, String importJobId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = ImportJobName.of(projectId, locationId, importJobId).toString();
      ImportDataFile importDataFile =
          ImportDataFile.newBuilder()
              .setFormat(ImportJobFormat.IMPORT_JOB_FORMAT_RVTOOLS_CSV)
              .setDisplayName("Example Import Data File")
              .build();

      // Initiate the operation and wait for completion.
      ImportDataFile response =
          client.createImportDataFileAsync(parent, importDataFile, importDataFileId)
              .get(5, TimeUnit.MINUTES);
      System.out.println("Created import data file: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_importdatafile_create]
