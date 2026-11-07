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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_mirroring_mirroringendpointgroupassociation_create]
import com.google.cloud.networksecurity.v1.MirroringClient;
import com.google.cloud.networksecurity.v1.MirroringEndpointGroupAssociation;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateMirroringEndpointGroupAssociation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String mirroringEndpointGroupAssociationId = "example-association-id";
    String mirroringEndpointGroupId = "example-endpoint-group-id";
    String networkId = "example-network-id";
    createMirroringEndpointGroupAssociation(
        projectId,
        locationId,
        mirroringEndpointGroupAssociationId,
        mirroringEndpointGroupId,
        networkId);
  }

  public static void createMirroringEndpointGroupAssociation(
      String projectId,
      String locationId,
      String mirroringEndpointGroupAssociationId,
      String mirroringEndpointGroupId,
      String networkId)
      throws Exception {
    try (MirroringClient client = MirroringClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String mirroringEndpointGroup =
          String.format(
              "projects/%s/locations/%s/mirroringEndpointGroups/%s",
              projectId, locationId, mirroringEndpointGroupId);
      String network = String.format("projects/%s/global/networks/%s", projectId, networkId);

      MirroringEndpointGroupAssociation mirroringEndpointGroupAssociation =
          MirroringEndpointGroupAssociation.newBuilder()
              .setMirroringEndpointGroup(mirroringEndpointGroup)
              .setNetwork(network)
              .build();

      MirroringEndpointGroupAssociation response =
          client
              .createMirroringEndpointGroupAssociationAsync(
                  parent, mirroringEndpointGroupAssociation, mirroringEndpointGroupAssociationId)
              .get(10, TimeUnit.MINUTES);

      System.out.printf("Created Mirroring Endpoint Group Association: %s%n", response.getName());
    }
  }
}
// [END networksecurity_v1_mirroring_mirroringendpointgroupassociation_create]
