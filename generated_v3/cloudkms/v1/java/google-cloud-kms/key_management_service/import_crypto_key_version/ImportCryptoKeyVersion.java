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

// [START cloudkms_v1_keymanagementservice_import_crypto_key_version]
import com.google.cloud.kms.v1.CryptoKeyVersion;
import com.google.cloud.kms.v1.CryptoKeyVersion.CryptoKeyVersionAlgorithm;
import com.google.cloud.kms.v1.ImportCryptoKeyVersionRequest;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class ImportCryptoKeyVersion {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    String importJobId = "example-import-job-id";
    byte[] wrappedKey = "example-wrapped-key".getBytes(StandardCharsets.UTF_8);
    importCryptoKeyVersion(projectId, locationId, keyRingId, cryptoKeyId, importJobId, wrappedKey);
  }

  public static void importCryptoKeyVersion(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String importJobId,
      byte[] wrappedKey)
      throws IOException {
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      CryptoKeyVersionAlgorithm algorithm =
          CryptoKeyVersionAlgorithm.GOOGLE_SYMMETRIC_ENCRYPTION;
      String importJob =
          String.format(
              "projects/%s/locations/%s/keyRings/%s/importJobs/%s",
              projectId, locationId, keyRingId, importJobId);
      String parent =
          String.format(
              "projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s",
              projectId, locationId, keyRingId, cryptoKeyId);

      ImportCryptoKeyVersionRequest request =
          ImportCryptoKeyVersionRequest.newBuilder()
              .setParent(parent)
              .setAlgorithm(algorithm)
              .setImportJob(importJob)
              .setWrappedKey(ByteString.copyFrom(wrappedKey))
              .build();

      CryptoKeyVersion response = client.importCryptoKeyVersion(request);
      System.out.println("Imported CryptoKeyVersion: " + response.getName());
    }
  }

  public static void importCryptoKeyVersion(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String importJobId,
      String wrappedKey)
      throws IOException {
    byte[] wrappedKeyBytes;
    try {
      wrappedKeyBytes = Base64.getDecoder().decode(wrappedKey.trim());
    } catch (IllegalArgumentException e) {
      try {
        wrappedKeyBytes = Base64.getUrlDecoder().decode(wrappedKey.trim());
      } catch (IllegalArgumentException ex) {
        wrappedKeyBytes = wrappedKey.getBytes(StandardCharsets.UTF_8);
      }
    }
    importCryptoKeyVersion(
        projectId,
        locationId,
        keyRingId,
        cryptoKeyId,
        importJobId,
        wrappedKeyBytes);
  }
}
// [END cloudkms_v1_keymanagementservice_import_crypto_key_version]
