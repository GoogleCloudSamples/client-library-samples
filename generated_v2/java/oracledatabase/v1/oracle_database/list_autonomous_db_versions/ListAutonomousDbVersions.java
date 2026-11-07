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

// [START oracledatabase_v1_oracledatabase_autonomousdbversions_list]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.oracledatabase.v1.AutonomousDbVersion;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;

public class ListAutonomousDbVersions {

  public static void main(String[] args) throws IOException {
    String projectId =
        args.length > 0
            ? args[0]
            : System.getenv().getOrDefault("GOOGLE_CLOUD_PROJECT", "example-project-id");
    String locationId =
        args.length > 1
            ? args[1]
            : System.getenv().getOrDefault("GOOGLE_CLOUD_LOCATION", "example-location-id");
    listAutonomousDbVersions(projectId, locationId);
  }

  public static void listAutonomousDbVersions(String projectId, String locationId)
      throws IOException {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (AutonomousDbVersion version : client.listAutonomousDbVersions(parent).iterateAll()) {
        System.out.println("Autonomous Database Version: " + version.getName());
        System.out.println("Version: " + version.getVersion());
      }
    } catch (ApiException e) {
      if (e.getMessage().contains("marketplace order")) {
        System.out.println(
            "An Oracle Database marketplace order is required to list Autonomous Database versions.");
      } else {
        throw e;
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_autonomousdbversions_list]
