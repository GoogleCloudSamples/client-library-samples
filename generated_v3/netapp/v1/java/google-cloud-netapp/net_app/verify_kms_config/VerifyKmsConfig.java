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

package com.google.cloud.netapp.v1;

// [START netapp_v1_netapp_verify_kms_config]
import com.google.cloud.netapp.v1.KmsConfigName;
import com.google.cloud.netapp.v1.NetAppClient;
import com.google.cloud.netapp.v1.VerifyKmsConfigRequest;
import com.google.cloud.netapp.v1.VerifyKmsConfigResponse;
import java.io.IOException;

public class VerifyKmsConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String kmsConfigId = "example-kms-config-id";
    verifyKmsConfig(projectId, locationId, kmsConfigId);
  }

  public static void verifyKmsConfig(String projectId, String locationId, String kmsConfigId)
      throws IOException {
    // Initialize the client. The client can be reused for multiple requests.
    try (NetAppClient client = NetAppClient.create()) {
      String name = KmsConfigName.format(projectId, locationId, kmsConfigId);
      VerifyKmsConfigRequest request =
          VerifyKmsConfigRequest.newBuilder()
              .setName(name)
              .build();

      VerifyKmsConfigResponse response = client.verifyKmsConfig(request);
      System.out.println("Verification healthy: " + response.getHealthy());
      System.out.println("Instructions: " + response.getInstructions());
    }
  }
}
// [END netapp_v1_netapp_verify_kms_config]
