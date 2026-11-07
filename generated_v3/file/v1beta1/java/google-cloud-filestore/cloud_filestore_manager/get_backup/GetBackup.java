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

package com.google.cloud.file.v1beta1;

// [START file_v1beta1_cloudfilestoremanager_backup_get]
import com.google.cloud.filestore.v1beta1.Backup;
import com.google.cloud.filestore.v1beta1.BackupName;
import com.google.cloud.filestore.v1beta1.CloudFilestoreManagerClient;
import java.io.IOException;

public class GetBackup {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String backupId = "example-backup-id";
    getBackup(projectId, locationId, backupId);
  }

  public static void getBackup(String projectId, String locationId, String backupId)
      throws IOException {
    // Initialize the client that manages Filestore resources using Application Default Credentials
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      String name = BackupName.of(projectId, locationId, backupId).toString();

      Backup backup = client.getBackup(name);

      System.out.println("Backup name: " + backup.getName());
      System.out.println("Backup state: " + backup.getState());
      System.out.println("Capacity (GB): " + backup.getCapacityGb());
      System.out.println("Source instance: " + backup.getSourceInstance());
    }
  }
}
// [END file_v1beta1_cloudfilestoremanager_backup_get]
