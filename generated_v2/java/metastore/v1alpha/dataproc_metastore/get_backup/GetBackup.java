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

package com.google.cloud.metastore.v1alpha;

// [START metastore_v1alpha_dataprocmetastore_backup_get]
import com.google.cloud.metastore.v1alpha.Backup;
import com.google.cloud.metastore.v1alpha.BackupName;
import com.google.cloud.metastore.v1alpha.DataprocMetastoreClient;
import java.io.IOException;

public class GetBackup {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String serviceId = "example-service_id";
    String backupId = "example-backup_id";
    String projectId = "example-project_id";
    getBackup(locationId, serviceId, backupId, projectId);
  }

  public static void getBackup(
      String locationId, String serviceId, String backupId, String projectId) throws Exception {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String name = BackupName.format(projectId, locationId, serviceId, backupId);

      Backup backup = client.getBackup(name);

      System.out.println("Retrieved backup: " + backup.getName());
      System.out.println("Backup state: " + backup.getState());
    }
  }
}
// [END metastore_v1alpha_dataprocmetastore_backup_get]
