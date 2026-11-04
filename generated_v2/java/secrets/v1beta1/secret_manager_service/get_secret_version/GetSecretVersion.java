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

// [START secretmanager_v1beta1_secretmanagerservice_secretversion_get]
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretVersion;
import com.google.cloud.secretmanager.v1beta1.SecretVersionName;

public class GetSecretVersion {

  public static void main(String[] args) throws Exception {
    String secretVersionId = "example-secret_version_id";
    String projectId = "example-project_id";
    String secretId = "example-secret_id";
    getSecretVersion(secretVersionId, projectId, secretId);
  }

  public static void getSecretVersion(String secretVersionId, String projectId, String secretId)
      throws Exception {
    // Initialize the Secret Manager client using Application Default Credentials
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String name = SecretVersionName.of(projectId, secretId, secretVersionId).toString();

      SecretVersion secretVersion = client.getSecretVersion(name);

      System.out.println("Secret version name: " + secretVersion.getName());
      System.out.println("Secret version state: " + secretVersion.getState());
      System.out.println("Created: " + secretVersion.getCreateTime().getSeconds());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_secretversion_get]
