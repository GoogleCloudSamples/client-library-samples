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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_reidentify_content]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.ContentItem;
import com.google.privacy.dlp.v2.CryptoDeterministicConfig;
import com.google.privacy.dlp.v2.CryptoKey;
import com.google.privacy.dlp.v2.CustomInfoType;
import com.google.privacy.dlp.v2.DeidentifyConfig;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.InfoTypeTransformations;
import com.google.privacy.dlp.v2.InfoTypeTransformations.InfoTypeTransformation;
import com.google.privacy.dlp.v2.InspectConfig;
import com.google.privacy.dlp.v2.PrimitiveTransformation;
import com.google.privacy.dlp.v2.ReidentifyContentRequest;
import com.google.privacy.dlp.v2.ReidentifyContentResponse;
import com.google.privacy.dlp.v2.UnwrappedCryptoKey;
import com.google.protobuf.ByteString;
import java.util.Base64;

public class ReidentifyContent {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    reidentifyContent(projectId);
  }

  public static void reidentifyContent(String projectId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      // Specify the content containing pseudonymized data
      ContentItem item = ContentItem.newBuilder()
          .setValue("Contact EMAIL_ADDRESS_TOKEN(39):AV30fD78kO9eXfLw==")
          .build();

      // Configure surrogate type detector to locate tokens in the content
      InfoType surrogateInfoType = InfoType.newBuilder()
          .setName("EMAIL_ADDRESS_TOKEN")
          .build();

      CustomInfoType customInfoType = CustomInfoType.newBuilder()
          .setInfoType(surrogateInfoType)
          .setSurrogateType(CustomInfoType.SurrogateType.getDefaultInstance())
          .build();

      InspectConfig inspectConfig = InspectConfig.newBuilder()
          .addCustomInfoTypes(customInfoType)
          .build();

      // AES-256 key matching the key used during de-identification
      byte[] keyBytes = Base64.getDecoder().decode("YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU=");
      UnwrappedCryptoKey unwrappedKey = UnwrappedCryptoKey.newBuilder()
          .setKey(ByteString.copyFrom(keyBytes))
          .build();

      CryptoKey cryptoKey = CryptoKey.newBuilder()
          .setUnwrapped(unwrappedKey)
          .build();

      // Configure deterministic decryption transformation
      CryptoDeterministicConfig cryptoDeterministicConfig = CryptoDeterministicConfig.newBuilder()
          .setCryptoKey(cryptoKey)
          .setSurrogateInfoType(surrogateInfoType)
          .build();

      PrimitiveTransformation primitiveTransformation = PrimitiveTransformation.newBuilder()
          .setCryptoDeterministicConfig(cryptoDeterministicConfig)
          .build();

      InfoTypeTransformation infoTypeTransformation = InfoTypeTransformation.newBuilder()
          .setPrimitiveTransformation(primitiveTransformation)
          .addInfoTypes(surrogateInfoType)
          .build();

      InfoTypeTransformations infoTypeTransformations = InfoTypeTransformations.newBuilder()
          .addTransformations(infoTypeTransformation)
          .build();

      DeidentifyConfig reidentifyConfig = DeidentifyConfig.newBuilder()
          .setInfoTypeTransformations(infoTypeTransformations)
          .build();

      ReidentifyContentRequest request = ReidentifyContentRequest.newBuilder()
          .setParent(parent)
          .setItem(item)
          .setInspectConfig(inspectConfig)
          .setReidentifyConfig(reidentifyConfig)
          .build();

      ReidentifyContentResponse response = client.reidentifyContent(request);
      System.out.println("Re-identified content: " + response.getItem().getValue());
    }
  }
}
// [END dlp_v2_dlpservice_reidentify_content]
