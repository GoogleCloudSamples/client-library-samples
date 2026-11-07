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

package com.google.cloud.certificatemanager.v1;

// [START certificatemanager_v1_certificatemanager_trustconfig_create]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.TrustConfig;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.Signature;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

public class CreateTrustConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String trustConfigId = "example-trust_config_id";
    createTrustConfig(projectId, locationId, trustConfigId);
  }

  public static void createTrustConfig(String projectId, String locationId, String trustConfigId)
      throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      // Generate a valid self-signed root CA certificate in PEM format for the trust anchor.
      String pemCertificate = generateSelfSignedCertificatePem();

      TrustConfig.TrustAnchor trustAnchor =
          TrustConfig.TrustAnchor.newBuilder().setPemCertificate(pemCertificate).build();

      TrustConfig.TrustStore trustStore =
          TrustConfig.TrustStore.newBuilder().addTrustAnchors(trustAnchor).build();

      TrustConfig trustConfig =
          TrustConfig.newBuilder()
              .setDescription("Example trust configuration")
              .addTrustStores(trustStore)
              .build();

      TrustConfig response =
          client
              .createTrustConfigAsync(parent, trustConfig, trustConfigId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created trust config: " + response.getName());
    }
  }

  private static String generateSelfSignedCertificatePem() throws GeneralSecurityException {
    KeyPairGenerator kpg = KeyPairGenerator.getInstance("EC");
    kpg.initialize(256);
    KeyPair keyPair = kpg.generateKeyPair();

    byte[] version = der(0xa0, der(0x02, new byte[] {0x02}));
    byte[] serial = der(0x02, new byte[] {0x01});
    byte[] sigAlg =
        new byte[] {
          0x30, 0x0a, 0x06, 0x08, 0x2a, (byte) 0x86, 0x48, (byte) 0xce, 0x3d, 0x04, 0x03, 0x02
        };
    byte[] name =
        der(
            0x30,
            der(
                0x31,
                der(
                    0x30,
                    concat(
                        new byte[] {0x06, 0x03, 0x55, 0x04, 0x03},
                        der(0x0c, "example-ca".getBytes(StandardCharsets.UTF_8))))));
    byte[] validity =
        der(
            0x30,
            concat(
                der(0x17, "240101000000Z".getBytes(StandardCharsets.US_ASCII)),
                der(0x17, "340101000000Z".getBytes(StandardCharsets.US_ASCII))));
    byte[] spki = keyPair.getPublic().getEncoded();
    byte[] basicConstraints =
        der(
            0x30,
            concat(
                new byte[] {0x06, 0x03, 0x55, 0x1d, 0x13, 0x01, 0x01, (byte) 0xff},
                der(0x04, der(0x30, new byte[] {0x01, 0x01, (byte) 0xff}))));
    byte[] extensions = der(0xa3, der(0x30, basicConstraints));

    byte[] tbs = der(0x30, concat(version, serial, sigAlg, name, validity, name, spki, extensions));

    Signature signature = Signature.getInstance("SHA256withECDSA");
    signature.initSign(keyPair.getPrivate());
    signature.update(tbs);
    byte[] sigBitString = bitString(signature.sign());

    byte[] cert = der(0x30, concat(tbs, sigAlg, sigBitString));

    return "-----BEGIN CERTIFICATE-----\n"
        + Base64.getMimeEncoder(64, new byte[] {'\n'}).encodeToString(cert)
        + "\n-----END CERTIFICATE-----\n";
  }

  private static byte[] bitString(byte[] data) {
    byte[] val = new byte[data.length + 1];
    val[0] = 0;
    System.arraycopy(data, 0, val, 1, data.length);
    return der(0x03, val);
  }

  private static byte[] der(int tag, byte[] val) {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    out.write(tag);
    if (val.length < 128) {
      out.write(val.length);
    } else if (val.length < 256) {
      out.write(0x81);
      out.write(val.length);
    } else {
      out.write(0x82);
      out.write((val.length >> 8) & 0xff);
      out.write(val.length & 0xff);
    }
    out.write(val, 0, val.length);
    return out.toByteArray();
  }

  private static byte[] concat(byte[]... arrays) {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    for (byte[] array : arrays) {
      out.write(array, 0, array.length);
    }
    return out.toByteArray();
  }
}
// [END certificatemanager_v1_certificatemanager_trustconfig_create]
