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

// [START cloudkms_v1_keymanagementservice_raw_encrypt]
import com.google.cloud.kms.v1.CryptoKeyVersionName;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.cloud.kms.v1.RawEncryptRequest;
import com.google.cloud.kms.v1.RawEncryptResponse;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class RawEncrypt {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    String cryptoKeyVersionId = "1";
    rawEncrypt(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId);
  }

  public static void rawEncrypt(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String cryptoKeyVersionId)
      throws IOException {
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name =
          CryptoKeyVersionName.of(
                  projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId)
              .toString();
      byte[] plaintext = "example-plaintext-data".getBytes(StandardCharsets.UTF_8);

      RawEncryptRequest request =
          RawEncryptRequest.newBuilder()
              .setName(name)
              .setPlaintext(ByteString.copyFrom(plaintext))
              .build();

      RawEncryptResponse response = client.rawEncrypt(request);

      System.out.printf(
          "Raw encryption completed. Ciphertext size: %d bytes%n", response.getCiphertext().size());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_raw_encrypt]
