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

// [START networkconnectivity_v1beta_transportmanager_transports_list]
import com.google.cloud.networkconnectivity.v1beta.Transport;
import com.google.cloud.networkconnectivity.v1beta.TransportManagerClient;

public class ListTransports {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listTransports(projectId, locationId);
  }

  public static void listTransports(String projectId, String locationId) throws Exception {
    // Initialize the client that will be used to send requests.
    try (TransportManagerClient client = TransportManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Transport transport : client.listTransports(parent).iterateAll()) {
        System.out.println("Transport: " + transport.getName());
      }
    }
  }
}
// [END networkconnectivity_v1beta_transportmanager_transports_list]
