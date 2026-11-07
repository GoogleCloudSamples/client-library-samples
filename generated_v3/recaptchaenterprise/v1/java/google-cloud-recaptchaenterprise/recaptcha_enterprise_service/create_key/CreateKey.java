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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_create]
import com.google.cloud.recaptchaenterprise.v1.RecaptchaEnterpriseServiceClient;
import com.google.recaptchaenterprise.v1.Key;
import com.google.recaptchaenterprise.v1.WebKeySettings;
import java.io.IOException;

public class CreateKey {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    createKey(projectId);
  }

  public static void createKey(String projectId) throws IOException {
    try (RecaptchaEnterpriseServiceClient client = RecaptchaEnterpriseServiceClient.create()) {
      String parent = "projects/" + projectId;

      WebKeySettings webSettings =
          WebKeySettings.newBuilder()
              .setIntegrationType(WebKeySettings.IntegrationType.SCORE)
              .setAllowAllDomains(true)
              .build();

      Key key =
          Key.newBuilder()
              .setDisplayName("example-key")
              .setWebSettings(webSettings)
              .build();

      Key response = client.createKey(parent, key);
      System.out.println("Created key: " + response.getName());
    }
  }
}
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_create]
