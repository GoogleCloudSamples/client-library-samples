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

package com.google.cloud.memorystore.v1;

// [START memorystore_v1_memorystore_backup_delete]
import com.google.cloud.memorystore.v1.BackupName;
import com.google.cloud.memorystore.v1.MemorystoreClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteBackup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupCollectionId = "example-backup_collection_id";
    String backupId = "example-backup_id";
    deleteBackup(projectId, locationId, backupCollectionId, backupId);
  }

  public static void deleteBackup(
      String projectId, String locationId, String backupCollectionId, String backupId)
      throws Exception {
    try (MemorystoreClient client = MemorystoreClient.create()) {
      String name = BackupName.of(projectId, locationId, backupCollectionId, backupId).toString();

      // DeleteBackup is a long-running operation; wait for it to complete.
      client.deleteBackupAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted backup: %s%n", name);
    }
  }
}
// [END memorystore_v1_memorystore_backup_delete]
