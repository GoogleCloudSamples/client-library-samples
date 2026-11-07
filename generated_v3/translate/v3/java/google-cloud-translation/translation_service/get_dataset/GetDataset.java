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

// [START translate_v3_translationservice_dataset_get]
import com.google.cloud.translate.v3.Dataset;
import com.google.cloud.translate.v3.DatasetName;
import com.google.cloud.translate.v3.TranslationServiceClient;

import java.io.IOException;

public class GetDataset {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String datasetId = "example-dataset-id";
    getDataset(projectId, locationId, datasetId);
  }

  public static void getDataset(String projectId, String locationId, String datasetId)
      throws IOException {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String name = DatasetName.of(projectId, locationId, datasetId).toString();

      Dataset dataset = client.getDataset(name);

      System.out.printf("Dataset name: %s%n", dataset.getName());
      System.out.printf("Display name: %s%n", dataset.getDisplayName());
      System.out.printf("Source language code: %s%n", dataset.getSourceLanguageCode());
      System.out.printf("Target language code: %s%n", dataset.getTargetLanguageCode());
    }
  }
}
// [END translate_v3_translationservice_dataset_get]
