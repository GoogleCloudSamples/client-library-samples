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

// [START iap_v1_identityawareproxyoauthservice_reset_identity_aware_proxy_client_secret]
import com.google.cloud.iap.v1.IdentityAwareProxyClient;
import com.google.cloud.iap.v1.IdentityAwareProxyOAuthServiceClient;
import com.google.cloud.iap.v1.ResetIdentityAwareProxyClientSecretRequest;

public class ResetIdentityAwareProxyClientSecret {

  public static void main(String[] args) throws Exception {
    String brandId = "example-brand-id";
    String projectId = "example-project-id";
    String identityAwareProxyClientId = "example-client-id";
    resetIdentityAwareProxyClientSecret(brandId, projectId, identityAwareProxyClientId);
  }

  public static void resetIdentityAwareProxyClientSecret(
      String brandId, String projectId, String identityAwareProxyClientId) throws Exception {
    try (IdentityAwareProxyOAuthServiceClient client =
        IdentityAwareProxyOAuthServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/brands/%s/identityAwareProxyClients/%s",
              projectId, brandId, identityAwareProxyClientId);

      ResetIdentityAwareProxyClientSecretRequest request =
          ResetIdentityAwareProxyClientSecretRequest.newBuilder().setName(name).build();

      IdentityAwareProxyClient response = client.resetIdentityAwareProxyClientSecret(request);
      System.out.println("Reset secret for client: " + response.getName());
    }
  }
}
// [END iap_v1_identityawareproxyoauthservice_reset_identity_aware_proxy_client_secret]
