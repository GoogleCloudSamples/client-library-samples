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

package com.google.cloud.datamigration.v1;

// [START datamigration_v1_datamigrationservice_privateconnection_create]
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.PrivateConnection;
import com.google.cloud.clouddms.v1.VpcPeeringConfig;

public class CreatePrivateConnection {

  public static void main(String[] args) throws Exception {
    String privateConnectionId = "example-private-connection-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String networkId = "example-network-id";
    createPrivateConnection(privateConnectionId, projectId, locationId, networkId);
  }

  public static void createPrivateConnection(
      String privateConnectionId, String projectId, String locationId, String networkId)
      throws Exception {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String vpcName = String.format("projects/%s/global/networks/%s", projectId, networkId);

      // Configure VPC peering settings using an available /29 subnet.
      VpcPeeringConfig vpcPeeringConfig =
          VpcPeeringConfig.newBuilder()
              .setVpcName(vpcName)
              .setSubnet("10.0.0.0/29")
              .build();

      PrivateConnection privateConnection =
          PrivateConnection.newBuilder()
              .setVpcPeeringConfig(vpcPeeringConfig)
              .build();

      // Create the private connection and wait for the long-running operation to complete.
      PrivateConnection response =
          client
              .createPrivateConnectionAsync(parent, privateConnection, privateConnectionId)
              .get();

      System.out.println("Created private connection: " + response.getName());
    }
  }
}
// [END datamigration_v1_datamigrationservice_privateconnection_create]
