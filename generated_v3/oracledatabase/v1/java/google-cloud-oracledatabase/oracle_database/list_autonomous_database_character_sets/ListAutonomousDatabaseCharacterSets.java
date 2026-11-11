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

// [START oracledatabase_v1_oracledatabase_autonomousdatabasecharactersets_list]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.oracledatabase.v1.AutonomousDatabaseCharacterSet;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;

public class ListAutonomousDatabaseCharacterSets {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listAutonomousDatabaseCharacterSets(projectId, locationId);
  }

  public static void listAutonomousDatabaseCharacterSets(String projectId, String locationId)
      throws IOException {
    String parent = String.format("projects/%s/locations/%s", projectId, locationId);
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      for (AutonomousDatabaseCharacterSet characterSet :
          client.listAutonomousDatabaseCharacterSets(parent).iterateAll()) {
        System.out.printf("Character set: %s%n", characterSet.getCharacterSet());
        System.out.printf("Resource name: %s%n", characterSet.getName());
      }
    } catch (ApiException e) {
      System.out.println(
          "An active marketplace order is required to list autonomous database character sets.");
    }
  }
}
// [END oracledatabase_v1_oracledatabase_autonomousdatabasecharactersets_list]
