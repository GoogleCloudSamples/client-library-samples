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

package com.google.cloud.iap.v1;

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_get]
import com.google.cloud.iap.v1.GetIdentityAwareProxyClientRequest;
import com.google.cloud.iap.v1.IdentityAwareProxyClient;
import com.google.cloud.iap.v1.IdentityAwareProxyOAuthServiceClient;
import java.io.IOException;

public class GetIdentityAwareProxyClient {

  public static void main(String[] args) throws Exception {
    String brandId = "example-brand-id";
    String projectId = "example-project-id";
    String clientId = "example-client-id";
    getIdentityAwareProxyClient(brandId, projectId, clientId);
  }

  public static void getIdentityAwareProxyClient(
      String brandId, String projectId, String clientId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (IdentityAwareProxyOAuthServiceClient client =
        IdentityAwareProxyOAuthServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/brands/%s/identityAwareProxyClients/%s",
              projectId, brandId, clientId);

      GetIdentityAwareProxyClientRequest request =
          GetIdentityAwareProxyClientRequest.newBuilder().setName(name).build();

      IdentityAwareProxyClient response = client.getIdentityAwareProxyClient(request);
      System.out.println("Client Name: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
    }
  }
}
// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_get]
