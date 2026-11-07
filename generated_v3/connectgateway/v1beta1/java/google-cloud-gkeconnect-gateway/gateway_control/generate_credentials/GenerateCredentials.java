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

package com.google.cloud.connectgateway.v1beta1;

// [START connectgateway_v1beta1_gatewaycontrol_generate_credentials]
import com.google.cloud.gkeconnect.gateway.v1beta1.GatewayControlClient;
import com.google.cloud.gkeconnect.gateway.v1beta1.GenerateCredentialsRequest;
import com.google.cloud.gkeconnect.gateway.v1beta1.GenerateCredentialsResponse;
import java.io.IOException;

public class GenerateCredentials {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String membershipId = "example-membership-id";
    generateCredentials(projectId, locationId, membershipId);
  }

  public static void generateCredentials(String projectId, String locationId, String membershipId)
      throws IOException {
    // Initialize the client within a try-with-resources block for automatic cleanup.
    try (GatewayControlClient client = GatewayControlClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/memberships/%s", projectId, locationId, membershipId);

      GenerateCredentialsRequest request =
          GenerateCredentialsRequest.newBuilder()
              .setName(name)
              .build();

      GenerateCredentialsResponse response = client.generateCredentials(request);
      System.out.println("Generated credentials endpoint: " + response.getEndpoint());
    }
  }
}
// [END connectgateway_v1beta1_gatewaycontrol_generate_credentials]
