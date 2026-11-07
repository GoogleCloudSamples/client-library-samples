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

// [START networksecurity_v1_networksecurity_backendauthenticationconfig_get]
import com.google.cloud.networksecurity.v1.BackendAuthenticationConfig;
import com.google.cloud.networksecurity.v1.BackendAuthenticationConfigName;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import java.io.IOException;

public class GetBackendAuthenticationConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backendAuthenticationConfigId = "example-backend-authentication-config-id";
    getBackendAuthenticationConfig(projectId, locationId, backendAuthenticationConfigId);
  }

  public static void getBackendAuthenticationConfig(
      String projectId, String locationId, String backendAuthenticationConfigId)
      throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String name =
          BackendAuthenticationConfigName.of(
                  projectId, locationId, backendAuthenticationConfigId)
              .toString();

      BackendAuthenticationConfig response = client.getBackendAuthenticationConfig(name);
      System.out.println("Retrieved BackendAuthenticationConfig: " + response.getName());
    }
  }
}
// [END networksecurity_v1_networksecurity_backendauthenticationconfig_get]
