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

// [START secretmanager_v1beta1_secretmanagerservice_secret_create]
import com.google.cloud.secretmanager.v1beta1.ProjectName;
import com.google.cloud.secretmanager.v1beta1.Replication;
import com.google.cloud.secretmanager.v1beta1.Secret;
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;

public class CreateSecret {

  public static void createSecret(String projectId, String secretId) throws Exception {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String parent = ProjectName.of(projectId).toString();
      Secret secret =
          Secret.newBuilder()
              .setReplication(
                  Replication.newBuilder()
                      .setAutomatic(Replication.Automatic.getDefaultInstance())
                      .build())
              .build();

      Secret response = client.createSecret(parent, secretId, secret);
      System.out.println("Created secret: " + response.getName());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_secret_create]
