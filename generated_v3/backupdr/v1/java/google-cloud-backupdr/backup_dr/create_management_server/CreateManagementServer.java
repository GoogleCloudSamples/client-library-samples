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

// [START backupdr_v1_backupdr_managementserver_create]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.ManagementServer;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateManagementServer {

  public static void main(String[] args)
      throws IOException, InterruptedException, ExecutionException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String managementServerId = "example-management-server-id";
    createManagementServer(projectId, locationId, managementServerId);
  }

  public static void createManagementServer(
      String projectId, String locationId, String managementServerId)
      throws IOException, InterruptedException, ExecutionException {
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ManagementServer managementServer =
          ManagementServer.newBuilder()
              .setType(ManagementServer.InstanceType.BACKUP_RESTORE)
              .setDescription("Management server for backup and recovery operations")
              .build();

      try {
        ManagementServer response =
            client.createManagementServerAsync(parent, managementServer, managementServerId).get();
        System.out.println("Created Management Server: " + response.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException) {
          System.out.println(
              "Management server creation is restricted in location: " + locationId);
        } else {
          throw e;
        }
      } catch (FailedPreconditionException e) {
        System.out.println(
            "Management server creation is restricted in location: " + locationId);
      }
    }
  }
}
// [END backupdr_v1_backupdr_managementserver_create]
