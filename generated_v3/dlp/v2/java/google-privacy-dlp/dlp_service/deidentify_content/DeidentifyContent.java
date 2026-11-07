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

// [START dlp_v2_dlpservice_deidentify_content]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CharacterMaskConfig;
import com.google.privacy.dlp.v2.ContentItem;
import com.google.privacy.dlp.v2.DeidentifyConfig;
import com.google.privacy.dlp.v2.DeidentifyContentRequest;
import com.google.privacy.dlp.v2.DeidentifyContentResponse;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.InfoTypeTransformations;
import com.google.privacy.dlp.v2.InfoTypeTransformations.InfoTypeTransformation;
import com.google.privacy.dlp.v2.InspectConfig;
import com.google.privacy.dlp.v2.Likelihood;
import com.google.privacy.dlp.v2.PrimitiveTransformation;
import com.google.privacy.dlp.v2.ProjectName;
import java.io.IOException;

public class DeidentifyContent {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    deidentifyContent(projectId);
  }

  public static void deidentifyContent(String projectId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      ContentItem item =
          ContentItem.newBuilder()
              .setValue("My phone number is 206-555-0123 and email is user@example.com")
              .build();

      InspectConfig inspectConfig =
          InspectConfig.newBuilder()
              .addInfoTypes(InfoType.newBuilder().setName("PHONE_NUMBER").build())
              .addInfoTypes(InfoType.newBuilder().setName("EMAIL_ADDRESS").build())
              .setMinLikelihood(Likelihood.POSSIBLE)
              .build();

      CharacterMaskConfig characterMaskConfig =
          CharacterMaskConfig.newBuilder().setMaskingCharacter("*").build();

      PrimitiveTransformation primitiveTransformation =
          PrimitiveTransformation.newBuilder()
              .setCharacterMaskConfig(characterMaskConfig)
              .build();

      InfoTypeTransformation infoTypeTransformation =
          InfoTypeTransformation.newBuilder()
              .setPrimitiveTransformation(primitiveTransformation)
              .build();

      InfoTypeTransformations infoTypeTransformations =
          InfoTypeTransformations.newBuilder()
              .addTransformations(infoTypeTransformation)
              .build();

      DeidentifyConfig deidentifyConfig =
          DeidentifyConfig.newBuilder()
              .setInfoTypeTransformations(infoTypeTransformations)
              .build();

      DeidentifyContentRequest request =
          DeidentifyContentRequest.newBuilder()
              .setParent(ProjectName.of(projectId).toString())
              .setItem(item)
              .setInspectConfig(inspectConfig)
              .setDeidentifyConfig(deidentifyConfig)
              .build();

      DeidentifyContentResponse response = client.deidentifyContent(request);

      System.out.println("De-identified item: " + response.getItem().getValue());
    }
  }
}
// [END dlp_v2_dlpservice_deidentify_content]
