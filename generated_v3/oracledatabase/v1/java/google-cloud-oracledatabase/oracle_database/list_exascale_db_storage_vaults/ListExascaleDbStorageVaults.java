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

// [START oracledatabase_v1_oracledatabase_exascaledbstoragevaults_list]
import com.google.cloud.oracledatabase.v1.ExascaleDbStorageVault;
import com.google.cloud.oracledatabase.v1.ListExascaleDbStorageVaultsRequest;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;

public class ListExascaleDbStorageVaults {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listExascaleDbStorageVaults(projectId, locationId);
  }

  public static void listExascaleDbStorageVaults(String projectId, String locationId)
      throws Exception {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListExascaleDbStorageVaultsRequest request =
          ListExascaleDbStorageVaultsRequest.newBuilder().setParent(parent).build();

      for (ExascaleDbStorageVault vault : client.listExascaleDbStorageVaults(request).iterateAll()) {
        System.out.printf("Exascale DB storage vault: %s%n", vault.getName());
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_exascaledbstoragevaults_list]
