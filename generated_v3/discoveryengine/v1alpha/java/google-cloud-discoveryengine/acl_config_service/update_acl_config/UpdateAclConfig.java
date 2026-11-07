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

// [START discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
import com.google.cloud.discoveryengine.v1alpha.AclConfig;
import com.google.cloud.discoveryengine.v1alpha.AclConfigName;
import com.google.cloud.discoveryengine.v1alpha.AclConfigServiceClient;
import com.google.cloud.discoveryengine.v1alpha.UpdateAclConfigRequest;
import java.io.IOException;

public class UpdateAclConfig {

  public static void main(String[] args) throws IOException {
    updateAclConfig();
  }

  public static void updateAclConfig() throws IOException {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("PROJECT_ID");
    }
    String location = "global";

    // Initialize client within try-with-resources to ensure proper cleanup.
    try (AclConfigServiceClient client = AclConfigServiceClient.create()) {
      AclConfig aclConfig =
          AclConfig.newBuilder()
              .setName(AclConfigName.of(projectId, location).toString())
              .build();

      UpdateAclConfigRequest request =
          UpdateAclConfigRequest.newBuilder()
              .setAclConfig(aclConfig)
              .build();

      AclConfig response = client.updateAclConfig(request);
      System.out.println("Updated ACL config: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
