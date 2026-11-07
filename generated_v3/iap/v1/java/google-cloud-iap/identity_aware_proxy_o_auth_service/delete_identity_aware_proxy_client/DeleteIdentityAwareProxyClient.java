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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
import com.google.cloud.iap.v1.DeleteIdentityAwareProxyClientRequest;
import com.google.cloud.iap.v1.IdentityAwareProxyOAuthServiceClient;
import java.io.IOException;

public class DeleteIdentityAwareProxyClient {

  public static void main(String[] args) throws IOException {
    String brandId = "example-brand-id";
    String projectId = "example-project-id";
    String identityAwareProxyClientId = "example-identity-aware-proxy-client-id";
    deleteIdentityAwareProxyClient(brandId, projectId, identityAwareProxyClientId);
  }

  public static void deleteIdentityAwareProxyClient(
      String brandId, String projectId, String identityAwareProxyClientId) throws IOException {
    try (IdentityAwareProxyOAuthServiceClient client =
        IdentityAwareProxyOAuthServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/brands/%s/identityAwareProxyClients/%s",
              projectId, brandId, identityAwareProxyClientId);
      DeleteIdentityAwareProxyClientRequest request =
          DeleteIdentityAwareProxyClientRequest.newBuilder().setName(name).build();
      client.deleteIdentityAwareProxyClient(request);
      System.out.printf("Deleted Identity-Aware Proxy client: %s%n", name);
    }
  }
}
// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
