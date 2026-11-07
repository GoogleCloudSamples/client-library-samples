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

package com.google.cloud.cloudkms.v1;

// [START cloudkms_v1_autokeyadmin_show_effective_autokey_config]
import com.google.cloud.kms.v1.AutokeyAdminClient;
import com.google.cloud.kms.v1.ShowEffectiveAutokeyConfigRequest;
import com.google.cloud.kms.v1.ShowEffectiveAutokeyConfigResponse;
import java.io.IOException;

public class ShowEffectiveAutokeyConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    showEffectiveAutokeyConfig(projectId);
  }

  public static void showEffectiveAutokeyConfig(String projectId) throws IOException {
    try (AutokeyAdminClient client = AutokeyAdminClient.create()) {
      String parent = String.format("projects/%s", projectId);

      ShowEffectiveAutokeyConfigRequest request =
          ShowEffectiveAutokeyConfigRequest.newBuilder()
              .setParent(parent)
              .build();

      ShowEffectiveAutokeyConfigResponse response = client.showEffectiveAutokeyConfig(request);

      System.out.println("Key project: " + response.getKeyProject());
    }
  }
}
// [END cloudkms_v1_autokeyadmin_show_effective_autokey_config]
