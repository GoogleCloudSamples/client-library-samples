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

// [START cloudkms_v1_keymanagementservice_decrypt]
import com.google.cloud.kms.v1.CryptoKeyName;
import com.google.cloud.kms.v1.DecryptResponse;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Decrypt {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    byte[] ciphertext = "example-ciphertext".getBytes(StandardCharsets.UTF_8);
    decrypt(projectId, locationId, keyRingId, cryptoKeyId, ciphertext);
  }

  public static void decrypt(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      byte[] ciphertext)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = CryptoKeyName.format(projectId, locationId, keyRingId, cryptoKeyId);

      DecryptResponse response = client.decrypt(name, ByteString.copyFrom(ciphertext));

      System.out.printf("Plaintext: %s%n", response.getPlaintext().toStringUtf8());
    }
  }

  public static void decrypt(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String ciphertext)
      throws IOException {
    byte[] ciphertextBytes;
    try {
      ciphertextBytes = Base64.getDecoder().decode(ciphertext.trim());
    } catch (IllegalArgumentException e) {
      try {
        ciphertextBytes = Base64.getUrlDecoder().decode(ciphertext.trim());
      } catch (IllegalArgumentException ex) {
        ciphertextBytes = ciphertext.getBytes(StandardCharsets.UTF_8);
      }
    }
    decrypt(projectId, locationId, keyRingId, cryptoKeyId, ciphertextBytes);
  }
}
// [END cloudkms_v1_keymanagementservice_decrypt]
