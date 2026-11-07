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

package com.google.cloud.networkconnectivity.v1beta;

// [START networkconnectivity_v1beta_hubservice_spoke_delete]
import com.google.cloud.networkconnectivity.v1beta.HubServiceClient;
import com.google.cloud.networkconnectivity.v1beta.SpokeName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteSpoke {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String spokeId = "example-spoke_id";
    deleteSpoke(projectId, locationId, spokeId);
  }

  public static void deleteSpoke(String projectId, String locationId, String spokeId)
      throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = SpokeName.of(projectId, locationId, spokeId).toString();

      // DeleteSpoke is a long-running operation; wait for the operation to complete.
      client.deleteSpokeAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted spoke: " + name);
    }
  }
}
// [END networkconnectivity_v1beta_hubservice_spoke_delete]
