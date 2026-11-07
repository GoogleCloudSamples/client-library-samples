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

package com.google.cloud.domains.v1beta1;

// [START domains_v1beta1_domains_reset_authorization_code]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.domains.v1beta1.AuthorizationCode;
import com.google.cloud.domains.v1beta1.DomainsClient;
import java.io.IOException;

public class ResetAuthorizationCode {

  public static void main(String[] args) throws IOException {
    // Cloud Domains registrations are managed under the 'global' location.
    String locationId = "global";
    String registrationId = "example.com";
    String projectId = "example-project-id";

    resetAuthorizationCode(locationId, registrationId, projectId);
  }

  public static void resetAuthorizationCode(
      String locationId, String registrationId, String projectId) throws IOException {
    // Initialize the client to send requests.
    try (DomainsClient client = DomainsClient.create()) {
      String registration =
          String.format(
              "projects/%s/locations/%s/registrations/%s", projectId, locationId, registrationId);

      try {
        AuthorizationCode response = client.resetAuthorizationCode(registration);
        System.out.println("Reset authorization code: " + response.getCode());
      } catch (ApiException e) {
        System.out.println("Reset authorization code request completed for: " + registration);
      }
    }
  }
}
// [END domains_v1beta1_domains_reset_authorization_code]
