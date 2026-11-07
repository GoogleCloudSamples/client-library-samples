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

package com.google.cloud.networkconnectivity.v1;

// [START networkconnectivity_v1_hubservice_hub_delete]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.networkconnectivity.v1.HubName;
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import com.google.cloud.networkconnectivity.v1.ListSpokesRequest;
import com.google.cloud.networkconnectivity.v1.OperationMetadata;
import com.google.cloud.networkconnectivity.v1.Spoke;
import com.google.protobuf.Empty;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteHub {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String hubId = "example-hub-id";
    deleteHub(projectId, hubId);
  }

  public static void deleteHub(String projectId, String hubId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = HubName.of(projectId, hubId).toString();

      // Network Connectivity Center requires deleting all associated spokes before deleting a hub.
      ListSpokesRequest listSpokesRequest =
          ListSpokesRequest.newBuilder()
              .setParent(String.format("projects/%s/locations/-", projectId))
              .build();
      for (Spoke spoke : client.listSpokes(listSpokesRequest).iterateAll()) {
        if (name.equals(spoke.getHub())) {
          client.deleteSpokeAsync(spoke.getName()).get(5, TimeUnit.MINUTES);
        }
      }

      OperationFuture<Empty, OperationMetadata> future = client.deleteHubAsync(name);
      future.get(5, TimeUnit.MINUTES);
      System.out.println("Hub deleted: " + name);
    }
  }
}
// [END networkconnectivity_v1_hubservice_hub_delete]
