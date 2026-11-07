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

package com.google.cloud.datastream.v1alpha1;

// [START datastream_v1alpha1_datastream_privateconnection_get]
import com.google.cloud.datastream.v1alpha1.DatastreamClient;
import com.google.cloud.datastream.v1alpha1.PrivateConnection;
import com.google.cloud.datastream.v1alpha1.PrivateConnectionName;
import java.io.IOException;

public class GetPrivateConnection {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String privateConnectionId = "example-private_connection_id";
    getPrivateConnection(projectId, locationId, privateConnectionId);
  }

  public static void getPrivateConnection(
      String projectId, String locationId, String privateConnectionId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DatastreamClient client = DatastreamClient.create()) {
      String name =
          PrivateConnectionName.of(projectId, locationId, privateConnectionId).toString();

      PrivateConnection response = client.getPrivateConnection(name);

      System.out.println("Private connection retrieved successfully.");
      System.out.println("Resource Name: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END datastream_v1alpha1_datastream_privateconnection_get]
