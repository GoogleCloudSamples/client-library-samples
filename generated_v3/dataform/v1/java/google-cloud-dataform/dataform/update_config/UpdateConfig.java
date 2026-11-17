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

package com.google.cloud.dataform.v1;

// [START dataform_v1_dataform_config_update]
import com.google.cloud.dataform.v1.Config;
import com.google.cloud.dataform.v1.DataformClient;
import com.google.protobuf.FieldMask;

public class UpdateConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String cryptoKeyId = "example-crypto-key-id";
    updateConfig(projectId, locationId, cryptoKeyId);
  }

  public static void updateConfig(String projectId, String locationId, String cryptoKeyId)
      throws Exception {
    // Initialize the client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      Config config =
          Config.newBuilder()
              .setName(String.format("projects/%s/locations/%s/config", projectId, locationId))
              .setDefaultKmsKeyName(cryptoKeyId)
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("default_kms_key_name").build();

      Config response = client.updateConfig(config, updateMask);
      System.out.println("Updated config: " + response.getName());
      System.out.println("Default KMS key: " + response.getDefaultKmsKeyName());
    }
  }
}
// [END dataform_v1_dataform_config_update]
