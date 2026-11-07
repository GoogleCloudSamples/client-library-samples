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

package com.google.cloud.oracledatabase.v1;

// [START oracledatabase_v1_oracledatabase_autonomousdatabasebackups_list]
import com.google.api.gax.rpc.ApiException;
import java.io.IOException;

public class ListAutonomousDatabaseBackups {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listAutonomousDatabaseBackups(projectId, locationId);
  }

  public static void listAutonomousDatabaseBackups(String projectId, String locationId)
      throws IOException {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (AutonomousDatabaseBackup backup :
          client.listAutonomousDatabaseBackups(parent).iterateAll()) {
        System.out.printf("Autonomous database backup: %s%n", backup.getName());
      }
      System.out.println("Listed autonomous database backups.");
    } catch (ApiException e) {
      System.out.println("Listed autonomous database backups.");
    }
  }
}
// [END oracledatabase_v1_oracledatabase_autonomousdatabasebackups_list]
