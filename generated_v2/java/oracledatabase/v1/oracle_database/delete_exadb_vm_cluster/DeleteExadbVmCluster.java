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

// [START oracledatabase_v1_oracledatabase_exadbvmcluster_delete]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.oracledatabase.v1.ExadbVmClusterName;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteExadbVmCluster {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String exadbVmClusterId = "example-exadb-vm-cluster-id";
    deleteExadbVmCluster(projectId, locationId, exadbVmClusterId);
  }

  public static void deleteExadbVmCluster(
      String projectId, String locationId, String exadbVmClusterId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String name = ExadbVmClusterName.of(projectId, locationId, exadbVmClusterId).toString();
      try {
        // Wait for the long-running operation to complete.
        client.deleteExadbVmClusterAsync(name).get(30, TimeUnit.MINUTES);
      } catch (ExecutionException e) {
        if (!(e.getCause() instanceof NotFoundException)) {
          throw e;
        }
      } catch (NotFoundException e) {
        // Treat as deleted if the resource does not exist.
      }
      System.out.printf("Exadb VM cluster deleted successfully: %s%n", name);
    }
  }
}
// [END oracledatabase_v1_oracledatabase_exadbvmcluster_delete]
