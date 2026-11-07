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

package com.google.cloud.recaptchaenterprise.v1;

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_update]
import com.google.cloud.recaptchaenterprise.v1.RecaptchaEnterpriseServiceClient;
import com.google.protobuf.FieldMask;
import com.google.recaptchaenterprise.v1.Key;
import com.google.recaptchaenterprise.v1.KeyName;
import java.io.IOException;

public class UpdateKey {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String keyId = "example-key-id";
    updateKey(projectId, keyId);
  }

  public static void updateKey(String projectId, String keyId) throws IOException {
    try (RecaptchaEnterpriseServiceClient client = RecaptchaEnterpriseServiceClient.create()) {
      // Build the key with updated attributes.
      Key key =
          Key.newBuilder()
              .setName(KeyName.of(projectId, keyId).toString())
              .setDisplayName("example-display-name")
              .build();

      // Specify which fields to update to prevent unintended overwrites.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      Key response = client.updateKey(key, updateMask);
      System.out.println("Updated reCAPTCHA key: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_update]
