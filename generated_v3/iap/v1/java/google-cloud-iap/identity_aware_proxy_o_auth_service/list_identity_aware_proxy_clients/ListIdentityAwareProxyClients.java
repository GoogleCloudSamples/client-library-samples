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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
import com.google.cloud.iap.v1.IdentityAwareProxyClient;
import com.google.cloud.iap.v1.IdentityAwareProxyOAuthServiceClient;
import com.google.cloud.iap.v1.ListIdentityAwareProxyClientsRequest;
import java.io.IOException;

public class ListIdentityAwareProxyClients {

  public static void main(String[] args) throws IOException {
    String brandId = "example-brand-id";
    String projectId = "example-project-id";
    listIdentityAwareProxyClients(brandId, projectId);
  }

  public static void listIdentityAwareProxyClients(String brandId, String projectId)
      throws IOException {
    try (IdentityAwareProxyOAuthServiceClient client =
        IdentityAwareProxyOAuthServiceClient.create()) {
      String parent = String.format("projects/%s/brands/%s", projectId, brandId);
      ListIdentityAwareProxyClientsRequest request =
          ListIdentityAwareProxyClientsRequest.newBuilder().setParent(parent).build();

      for (IdentityAwareProxyClient identityAwareProxyClient :
          client.listIdentityAwareProxyClients(request).iterateAll()) {
        System.out.println("Client Name: " + identityAwareProxyClient.getName());
        System.out.println("Display Name: " + identityAwareProxyClient.getDisplayName());
      }
    }
  }
}
// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
