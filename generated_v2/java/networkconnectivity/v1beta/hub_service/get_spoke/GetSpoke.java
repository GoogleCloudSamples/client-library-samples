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

// [START networkconnectivity_v1beta_hubservice_spoke_get]
import com.google.cloud.networkconnectivity.v1beta.HubServiceClient;
import com.google.cloud.networkconnectivity.v1beta.Spoke;
import com.google.cloud.networkconnectivity.v1beta.SpokeName;

public class GetSpoke {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String spokeId = "example-spoke-id";
    getSpoke(projectId, locationId, spokeId);
  }

  public static void getSpoke(String projectId, String locationId, String spokeId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = SpokeName.of(projectId, locationId, spokeId).toString();
      Spoke response = client.getSpoke(name);
      System.out.println("Retrieved spoke: " + response.getName());
      System.out.println("Associated hub: " + response.getHub());
      System.out.println("Spoke state: " + response.getState());
    }
  }
}
// [END networkconnectivity_v1beta_hubservice_spoke_get]
