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

// [START secretmanager_v1beta1_secretmanagerservice_disable_secret_version]
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretVersion;
import com.google.cloud.secretmanager.v1beta1.SecretVersionName;

public class DisableSecretVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String secretId = "example-secret_id";
    String versionId = "example-version_id";
    disableSecretVersion(projectId, secretId, versionId);
  }

  public static void disableSecretVersion(String projectId, String secretId, String versionId)
      throws Exception {
    // Initialize the client using Application Default Credentials (ADC).
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String name = SecretVersionName.of(projectId, secretId, versionId).toString();

      // Disable the specified secret version.
      SecretVersion response = client.disableSecretVersion(name);
      System.out.printf("Disabled secret version: %s%n", response.getName());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_disable_secret_version]
