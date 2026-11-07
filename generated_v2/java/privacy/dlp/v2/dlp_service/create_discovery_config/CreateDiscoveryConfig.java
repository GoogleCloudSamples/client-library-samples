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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_discoveryconfig_create]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CreateDiscoveryConfigRequest;
import com.google.privacy.dlp.v2.DiscoveryConfig;
import com.google.privacy.dlp.v2.DiscoveryTarget;
import com.google.privacy.dlp.v2.SecretsDiscoveryTarget;
import java.io.IOException;

public class CreateDiscoveryConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String configId = "example-config-id";
    createDiscoveryConfig(projectId, locationId, configId);
  }

  public static void createDiscoveryConfig(String projectId, String locationId, String configId)
      throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      // Configure a discovery target to scan for secrets
      DiscoveryTarget discoveryTarget =
          DiscoveryTarget.newBuilder()
              .setSecretsTarget(SecretsDiscoveryTarget.newBuilder().build())
              .build();

      DiscoveryConfig discoveryConfig =
          DiscoveryConfig.newBuilder()
              .setStatus(DiscoveryConfig.Status.RUNNING)
              .setDisplayName("Example Discovery Config")
              .addTargets(discoveryTarget)
              .build();

      CreateDiscoveryConfigRequest request =
          CreateDiscoveryConfigRequest.newBuilder()
              .setParent(parent)
              .setConfigId(configId)
              .setDiscoveryConfig(discoveryConfig)
              .build();

      DiscoveryConfig response = client.createDiscoveryConfig(request);
      System.out.println("Created discovery configuration: " + response.getName());
    }
  }
}
// [END dlp_v2_dlpservice_discoveryconfig_create]
