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

// [START dlp_v2_dlpservice_deidentifytemplate_create]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CreateDeidentifyTemplateRequest;
import com.google.privacy.dlp.v2.DeidentifyConfig;
import com.google.privacy.dlp.v2.DeidentifyTemplate;
import com.google.privacy.dlp.v2.InfoTypeTransformations;
import com.google.privacy.dlp.v2.InfoTypeTransformations.InfoTypeTransformation;
import com.google.privacy.dlp.v2.PrimitiveTransformation;
import com.google.privacy.dlp.v2.ReplaceWithInfoTypeConfig;
import java.io.IOException;

public class CreateDeidentifyTemplate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    createDeidentifyTemplate(projectId);
  }

  public static void createDeidentifyTemplate(String projectId) throws Exception {
    // Initialize client that will be closed when the block completes.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      // Define transformation to mask detected sensitive data with the info type name.
      InfoTypeTransformation transformation =
          InfoTypeTransformation.newBuilder()
              .setPrimitiveTransformation(
                  PrimitiveTransformation.newBuilder()
                      .setReplaceWithInfoTypeConfig(ReplaceWithInfoTypeConfig.getDefaultInstance())
                      .build())
              .build();

      InfoTypeTransformations transformations =
          InfoTypeTransformations.newBuilder()
              .addTransformations(transformation)
              .build();

      DeidentifyConfig deidentifyConfig =
          DeidentifyConfig.newBuilder()
              .setInfoTypeTransformations(transformations)
              .build();

      DeidentifyTemplate deidentifyTemplate =
          DeidentifyTemplate.newBuilder()
              .setDisplayName("Configurable De-identify Template")
              .setDescription("Replaces identified sensitive data with the corresponding info type")
              .setDeidentifyConfig(deidentifyConfig)
              .build();

      CreateDeidentifyTemplateRequest request =
          CreateDeidentifyTemplateRequest.newBuilder()
              .setParent(parent)
              .setDeidentifyTemplate(deidentifyTemplate)
              .build();

      DeidentifyTemplate response = client.createDeidentifyTemplate(request);
      System.out.println("Deidentify template created: " + response.getName());
    }
  }
}
// [END dlp_v2_dlpservice_deidentifytemplate_create]
