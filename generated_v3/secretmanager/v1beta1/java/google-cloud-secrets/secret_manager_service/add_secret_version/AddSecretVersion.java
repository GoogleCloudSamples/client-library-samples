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

// [START secretmanager_v1beta1_secretmanagerservice_add_secret_version]
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretName;
import com.google.cloud.secretmanager.v1beta1.SecretPayload;
import com.google.cloud.secretmanager.v1beta1.SecretVersion;
import com.google.protobuf.ByteString;
import java.io.IOException;

public class AddSecretVersion {

  public static void addSecretVersion(String projectId, String secretId) throws IOException {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String parent = SecretName.of(projectId, secretId).toString();
      SecretPayload payload =
          SecretPayload.newBuilder()
              .setData(ByteString.copyFromUtf8("hello world!"))
              .build();

      SecretVersion response = client.addSecretVersion(parent, payload);
      System.out.println("Added secret version: " + response.getName());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_add_secret_version]
