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

// [START networksecurity_v1_networksecurity_backendauthenticationconfigs_list]
import com.google.cloud.networksecurity.v1.BackendAuthenticationConfig;
import com.google.cloud.networksecurity.v1.ListBackendAuthenticationConfigsRequest;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;

public class ListBackendAuthenticationConfigs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listBackendAuthenticationConfigs(projectId, locationId);
  }

  public static void listBackendAuthenticationConfigs(String projectId, String locationId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListBackendAuthenticationConfigsRequest request =
          ListBackendAuthenticationConfigsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (BackendAuthenticationConfig config :
          client.listBackendAuthenticationConfigs(request).iterateAll()) {
        System.out.println("Retrieved backend authentication config: " + config.getName());
      }
    }
  }
}
// [END networksecurity_v1_networksecurity_backendauthenticationconfigs_list]
