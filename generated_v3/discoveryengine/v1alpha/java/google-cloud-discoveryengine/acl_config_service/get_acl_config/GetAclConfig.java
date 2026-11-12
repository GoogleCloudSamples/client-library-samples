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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_aclconfigservice_aclconfig_get]
import com.google.cloud.discoveryengine.v1alpha.AclConfig;
import com.google.cloud.discoveryengine.v1alpha.AclConfigName;
import com.google.cloud.discoveryengine.v1alpha.AclConfigServiceClient;
import com.google.cloud.discoveryengine.v1alpha.GetAclConfigRequest;

public class GetAclConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    getAclConfig(projectId, locationId);
  }

  public static void getAclConfig(String projectId, String locationId) throws Exception {
    try (AclConfigServiceClient client = AclConfigServiceClient.create()) {
      String name = AclConfigName.of(projectId, locationId).toString();
      GetAclConfigRequest request = GetAclConfigRequest.newBuilder()
          .setName(name)
          .build();
      AclConfig response = client.getAclConfig(request);
      System.out.println("ACL config name: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_aclconfigservice_aclconfig_get]
