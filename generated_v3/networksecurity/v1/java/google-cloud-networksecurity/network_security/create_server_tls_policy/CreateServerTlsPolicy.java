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

// [START networksecurity_v1_networksecurity_servertlspolicy_create]
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import com.google.cloud.networksecurity.v1.ServerTlsPolicy;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateServerTlsPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String serverTlsPolicyId = "example-server-tls-policy-id";
    createServerTlsPolicy(projectId, locationId, serverTlsPolicyId);
  }

  public static void createServerTlsPolicy(
      String projectId, String locationId, String serverTlsPolicyId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ServerTlsPolicy serverTlsPolicy =
          ServerTlsPolicy.newBuilder()
              .setDescription("Sample Server TLS Policy")
              .setAllowOpen(true)
              .build();

      ServerTlsPolicy response =
          client
              .createServerTlsPolicyAsync(parent, serverTlsPolicy, serverTlsPolicyId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created Server TLS Policy: " + response.getName());
    }
  }
}
// [END networksecurity_v1_networksecurity_servertlspolicy_create]
