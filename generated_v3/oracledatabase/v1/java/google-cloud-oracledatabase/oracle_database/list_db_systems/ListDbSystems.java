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

// [START oracledatabase_v1_oracledatabase_dbsystems_list]
import com.google.cloud.oracledatabase.v1.DbSystem;
import com.google.cloud.oracledatabase.v1.LocationName;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;

public class ListDbSystems {

  public static void listDbSystems(String projectId, String locationId) throws Exception {
    // Initialize the client once for connection reuse across requests.
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (DbSystem element : client.listDbSystems(parent).iterateAll()) {
        System.out.println(element.getName());
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_dbsystems_list]
