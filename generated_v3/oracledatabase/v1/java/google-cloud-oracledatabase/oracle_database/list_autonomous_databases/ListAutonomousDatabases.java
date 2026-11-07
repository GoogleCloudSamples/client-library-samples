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

// [START oracledatabase_v1_oracledatabase_autonomousdatabases_list]
import com.google.cloud.oracledatabase.v1.AutonomousDatabase;
import com.google.cloud.oracledatabase.v1.LocationName;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;

public class ListAutonomousDatabases {

  public static void listAutonomousDatabases(String projectId, String locationId)
      throws IOException {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (AutonomousDatabase database : client.listAutonomousDatabases(parent).iterateAll()) {
        System.out.println("Autonomous Database: " + database.getName());
        System.out.println("Display Name: " + database.getDisplayName());
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_autonomousdatabases_list]
