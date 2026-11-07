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

// [START secretmanager_v1beta1_secretmanagerservice_secretversions_list]
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretName;
import com.google.cloud.secretmanager.v1beta1.SecretVersion;

public class ListSecretVersions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String secretId = "example-secret-id";
    listSecretVersions(projectId, secretId);
  }

  public static void listSecretVersions(String projectId, String secretId) throws Exception {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String parent = SecretName.of(projectId, secretId).toString();
      for (SecretVersion version : client.listSecretVersions(parent).iterateAll()) {
        System.out.printf("Secret version: %s, state: %s%n", version.getName(), version.getState());
      }
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_secretversions_list]
