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

// [START secretmanager_v1beta1_secretmanagerservice_secret_update]
import com.google.cloud.secretmanager.v1beta1.Secret;
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretName;
import com.google.protobuf.FieldMask;

public class UpdateSecret {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String secretId = "example-secret_id";
    updateSecret(projectId, secretId);
  }

  public static void updateSecret(String projectId, String secretId) throws Exception {
    // Initialize the Secret Manager client using Application Default Credentials (ADC).
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      Secret secret =
          Secret.newBuilder()
              .setName(SecretName.of(projectId, secretId).toString())
              .putLabels("updated", "true")
              .build();

      Secret response = client.updateSecret(secret, updateMask);
      System.out.println("Updated secret: " + response.getName());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_secret_update]
