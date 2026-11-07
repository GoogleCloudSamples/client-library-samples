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

// [START iap_v1_identityawareproxyadminservice_iapsettings_get]
import com.google.cloud.iap.v1.GetIapSettingsRequest;
import com.google.cloud.iap.v1.IapSettings;
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;

public class GetIapSettings {

  public static void main(String[] args) throws Exception {
    // The resource name of the IAP-protected resource.
    // For example, "projects/example-project-id" or "projects/example-project-id/iap_web".
    String name = "projects/example-project-id";
    getIapSettings(name);
  }

  public static void getIapSettings(String name) throws Exception {
    try (IdentityAwareProxyAdminServiceClient client =
        IdentityAwareProxyAdminServiceClient.create()) {
      GetIapSettingsRequest request = GetIapSettingsRequest.newBuilder().setName(name).build();
      IapSettings response = client.getIapSettings(request);

      System.out.println("Retrieved IAP settings: " + response.getName());
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_iapsettings_get]
