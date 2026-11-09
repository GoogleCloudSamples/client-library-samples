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

// [START secretmanager_v1beta1_secretmanagerservice_secret_get]
import com.google.cloud.secretmanager.v1beta1.Secret;
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretName;
import java.io.IOException;

public class GetSecret {

  public static void main(String[] args) throws IOException {
    if (args.length >= 2) {
      String projectId = args[0];
      String secretId = args[1];
      getSecret(projectId, secretId);
    }
  }

  public static void getSecret(String projectId, String secretId) throws IOException {
    // Initialize the Secret Manager client with Application Default Credentials
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String name = SecretName.of(projectId, secretId).toString();

      Secret secret = client.getSecret(name);

      System.out.println("Secret: " + secret.getName());
      System.out.println("Replication: " + secret.getReplication());
      System.out.println("Create time: " + secret.getCreateTime());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_secret_get]
