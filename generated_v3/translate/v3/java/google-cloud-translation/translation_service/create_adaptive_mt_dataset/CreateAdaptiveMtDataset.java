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

package com.google.cloud.translate.v3;

// [START translate_v3_translationservice_adaptivemtdataset_create]
import com.google.cloud.translate.v3.AdaptiveMtDataset;
import com.google.cloud.translate.v3.AdaptiveMtDatasetName;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;

public class CreateAdaptiveMtDataset {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createAdaptiveMtDataset(projectId, locationId);
  }

  public static void createAdaptiveMtDataset(String projectId, String locationId)
      throws IOException {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      AdaptiveMtDataset adaptiveMtDataset =
          AdaptiveMtDataset.newBuilder()
              .setName(
                  AdaptiveMtDatasetName.of(projectId, locationId, "example-adaptive-mt-dataset")
                      .toString())
              .setDisplayName("example-adaptive-mt-dataset")
              .setSourceLanguageCode("en")
              .setTargetLanguageCode("es")
              .build();

      AdaptiveMtDataset response = client.createAdaptiveMtDataset(parent, adaptiveMtDataset);

      System.out.printf("Dataset name: %s%n", response.getName());
      System.out.printf("Display name: %s%n", response.getDisplayName());
    }
  }
}
// [END translate_v3_translationservice_adaptivemtdataset_create]
