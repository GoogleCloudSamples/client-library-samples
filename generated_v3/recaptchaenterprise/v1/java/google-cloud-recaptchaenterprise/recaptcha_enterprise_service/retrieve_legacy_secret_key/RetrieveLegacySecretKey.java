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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_retrieve_legacy_secret_key]
import com.google.cloud.recaptchaenterprise.v1.RecaptchaEnterpriseServiceClient;
import com.google.recaptchaenterprise.v1.KeyName;
import com.google.recaptchaenterprise.v1.RetrieveLegacySecretKeyResponse;
import java.io.IOException;

public class RetrieveLegacySecretKey {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String keyId = "example-key_id";
    retrieveLegacySecretKey(projectId, keyId);
  }

  public static void retrieveLegacySecretKey(String projectId, String keyId) throws Exception {
    try (RecaptchaEnterpriseServiceClient client = RecaptchaEnterpriseServiceClient.create()) {
      String key = KeyName.of(projectId, keyId).toString();

      RetrieveLegacySecretKeyResponse response = client.retrieveLegacySecretKey(key);

      System.out.println("Legacy secret key: " + response.getLegacySecretKey());
    }
  }
}
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_retrieve_legacy_secret_key]
