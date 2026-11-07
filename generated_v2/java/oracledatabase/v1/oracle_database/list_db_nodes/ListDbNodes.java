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

// [START oracledatabase_v1_oracledatabase_dbnodes_list]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.oracledatabase.v1.DbNode;
import com.google.cloud.oracledatabase.v1.ListDbNodesRequest;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;

public class ListDbNodes {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String cloudVmClusterId = "example-cloud-vm-cluster-id";
    listDbNodes(projectId, locationId, cloudVmClusterId);
  }

  // Lists database nodes for a specified Cloud VM cluster.
  public static void listDbNodes(String projectId, String locationId, String cloudVmClusterId)
      throws IOException {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/cloudVmClusters/%s",
              projectId, locationId, cloudVmClusterId);

      ListDbNodesRequest request = ListDbNodesRequest.newBuilder().setParent(parent).build();
      try {
        for (DbNode dbNode : client.listDbNodes(request).iterateAll()) {
          System.out.printf("Database node: %s%n", dbNode.getName());
        }
      } catch (NotFoundException e) {
        System.out.printf("No database nodes listed for cluster: %s%n", cloudVmClusterId);
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_dbnodes_list]
