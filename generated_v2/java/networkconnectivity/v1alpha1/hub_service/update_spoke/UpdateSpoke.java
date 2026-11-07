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

package com.google.cloud.networkconnectivity.v1alpha1;

// [START networkconnectivity_v1alpha1_hubservice_spoke_update]
import com.google.cloud.networkconnectivity.v1alpha1.HubServiceClient;
import com.google.cloud.networkconnectivity.v1alpha1.Spoke;
import com.google.cloud.networkconnectivity.v1alpha1.SpokeName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateSpoke {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String spokeId = "example-spoke_id";
    updateSpoke(projectId, locationId, spokeId);
  }

  public static void updateSpoke(String projectId, String locationId, String spokeId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (HubServiceClient client = HubServiceClient.create()) {
      Spoke spoke =
          Spoke.newBuilder()
              .setName(SpokeName.of(projectId, locationId, spokeId).toString())
              .setDescription("Updated sample spoke description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      Spoke response = client.updateSpokeAsync(spoke, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated spoke: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1alpha1_hubservice_spoke_update]
