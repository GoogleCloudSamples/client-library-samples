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

// [START memorystore_v1_memorystore_backupcollection_get]
import com.google.cloud.memorystore.v1.BackupCollection;
import com.google.cloud.memorystore.v1.BackupCollectionName;
import com.google.cloud.memorystore.v1.MemorystoreClient;
import java.io.IOException;

public class GetBackupCollection {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backupCollectionId = "example-backup-collection-id";
    getBackupCollection(projectId, locationId, backupCollectionId);
  }

  public static void getBackupCollection(
      String projectId, String locationId, String backupCollectionId) throws Exception {
    // Initialize client with Application Default Credentials
    try (MemorystoreClient client = MemorystoreClient.create()) {
      String name = BackupCollectionName.of(projectId, locationId, backupCollectionId).toString();

      BackupCollection backupCollection = client.getBackupCollection(name);

      System.out.println("Backup Collection Name: " + backupCollection.getName());
      System.out.println("Backup Collection KMS Key: " + backupCollection.getKmsKey());
    }
  }
}
// [END memorystore_v1_memorystore_backupcollection_get]
