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

package com.google.cloud.cloudkms.v1;

// [START cloudkms_v1_keymanagementservice_encrypt]
import com.google.cloud.kms.v1.CryptoKeyName;
import com.google.cloud.kms.v1.EncryptRequest;
import com.google.cloud.kms.v1.EncryptResponse;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Encrypt {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    byte[] plaintext = "example-plaintext".getBytes(StandardCharsets.UTF_8);
    encrypt(projectId, locationId, keyRingId, cryptoKeyId, plaintext);
  }

  public static void encrypt(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      byte[] plaintext)
      throws IOException {
    // Initialize the client. Create the client once and reuse it across multiple requests.
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = CryptoKeyName.of(projectId, locationId, keyRingId, cryptoKeyId).toString();

      EncryptRequest request =
          EncryptRequest.newBuilder()
              .setName(name)
              .setPlaintext(ByteString.copyFrom(plaintext))
              .build();

      EncryptResponse response = client.encrypt(request);
      System.out.printf("Encrypted with key version: %s%n", response.getName());
      System.out.printf("Ciphertext size: %d bytes%n", response.getCiphertext().size());
    }
  }

  public static void encrypt(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String plaintext)
      throws IOException {
    encrypt(
        projectId,
        locationId,
        keyRingId,
        cryptoKeyId,
        plaintext.getBytes(StandardCharsets.UTF_8));
  }
}
// [END cloudkms_v1_keymanagementservice_encrypt]
