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

package com.google.cloud.secretmanager.v1beta1;

// [START secretmanager_v1beta1_secretmanagerservice_secretversion_access]
import com.google.cloud.secretmanager.v1beta1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretVersionName;
import java.io.IOException;

public class AccessSecretVersion {

  public static void accessSecretVersion(String projectId, String secretId, String versionId)
      throws IOException {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String name = SecretVersionName.of(projectId, secretId, versionId).toString();
      AccessSecretVersionResponse response = client.accessSecretVersion(name);

      System.out.printf("Accessed secret version: %s%n", response.getName());
      System.out.printf(
          "Secret payload data: %s%n", response.getPayload().getData().toStringUtf8());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_secretversion_access]
