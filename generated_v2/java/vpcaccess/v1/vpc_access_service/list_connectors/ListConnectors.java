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

package com.google.cloud.vpcaccess.v1;

// [START vpcaccess_v1_vpcaccessservice_connectors_list]
import com.google.cloud.vpcaccess.v1.Connector;
import com.google.cloud.vpcaccess.v1.LocationName;
import com.google.cloud.vpcaccess.v1.VpcAccessServiceClient;
import java.io.IOException;

public class ListConnectors {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listConnectors(projectId, locationId);
  }

  // Lists Serverless VPC Access connectors in a given project and location.
  public static void listConnectors(String projectId, String locationId) throws IOException {
    try (VpcAccessServiceClient client = VpcAccessServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Connector connector : client.listConnectors(parent).iterateAll()) {
        System.out.println("Connector name: " + connector.getName());
        System.out.println("Network: " + connector.getNetwork());
        System.out.println("IP CIDR range: " + connector.getIpCidrRange());
      }
    }
  }
}
// [END vpcaccess_v1_vpcaccessservice_connectors_list]
