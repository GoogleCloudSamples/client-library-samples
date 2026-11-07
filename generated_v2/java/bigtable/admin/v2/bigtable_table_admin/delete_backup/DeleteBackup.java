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

package com.google.cloud.bigtable.v2;

// [START bigtable_v2_bigtabletableadmin_backup_delete]
import com.google.cloud.bigtable.admin.v2.BigtableTableAdminClient;
import java.io.IOException;

public class DeleteBackup {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String instanceId = "example-instance-id";
    String clusterId = "example-cluster-id";
    String backupId = "example-backup-id";
    deleteBackup(projectId, instanceId, clusterId, backupId);
  }

  public static void deleteBackup(
      String projectId, String instanceId, String clusterId, String backupId) throws IOException {
    try (BigtableTableAdminClient client =
        BigtableTableAdminClient.create(projectId, instanceId)) {
      String name =
          String.format(
              "projects/%s/instances/%s/clusters/%s/backups/%s",
              projectId, instanceId, clusterId, backupId);
      client.deleteBackup(clusterId, backupId);
      System.out.println("Deleted backup: " + name);
    }
  }
}
// [END bigtable_v2_bigtabletableadmin_backup_delete]
