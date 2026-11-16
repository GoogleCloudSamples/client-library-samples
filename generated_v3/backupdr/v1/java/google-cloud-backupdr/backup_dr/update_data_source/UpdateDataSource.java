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

package com.google.cloud.backupdr.v1;

// [START backupdr_v1_backupdr_datasource_update]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.DataSource;
import com.google.cloud.backupdr.v1.DataSourceName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateDataSource {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupVaultId = "example-backup_vault_id";
    String dataSourceId = "example-data_source_id";
    updateDataSource(projectId, locationId, backupVaultId, dataSourceId);
  }

  public static void updateDataSource(
      String projectId, String locationId, String backupVaultId, String dataSourceId)
      throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      DataSource dataSource =
          DataSource.newBuilder()
              .setName(
                  DataSourceName.of(projectId, locationId, backupVaultId, dataSourceId).toString())
              .putLabels("env", "prod")
              .build();

      // Initiate the update operation and wait for completion.
      DataSource response = client.updateDataSourceAsync(dataSource, updateMask).get();
      System.out.println("Updated DataSource: " + response.getName());
    }
  }
}
// [END backupdr_v1_backupdr_datasource_update]
