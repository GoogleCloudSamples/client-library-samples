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

// [START oracledatabase_v1_oracledatabase_dbsystem_delete]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteDbSystem {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dbSystemId = "example-db-system-id";
    deleteDbSystem(projectId, locationId, dbSystemId);
  }

  public static void deleteDbSystem(String projectId, String locationId, String dbSystemId)
      throws Exception {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/dbSystems/%s", projectId, locationId, dbSystemId);

      try {
        // Wait for the long-running operation to complete.
        client.deleteDbSystemAsync(name).get(15, TimeUnit.MINUTES);
        System.out.printf("Deleted DB system: %s%n", name);
      } catch (ExecutionException e) {
        if (e.getCause() instanceof NotFoundException) {
          System.out.printf("Deleted DB system: %s%n", name);
        } else {
          throw e;
        }
      } catch (NotFoundException e) {
        System.out.printf("Deleted DB system: %s%n", name);
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_dbsystem_delete]
