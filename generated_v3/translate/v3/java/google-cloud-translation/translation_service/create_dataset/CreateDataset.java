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

// [START translate_v3_translationservice_dataset_create]
import com.google.cloud.translate.v3.Dataset;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateDataset {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createDataset(projectId, locationId);
  }

  public static void createDataset(String projectId, String locationId) throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Dataset dataset =
          Dataset.newBuilder()
              .setDisplayName("example_dataset")
              .setSourceLanguageCode("en")
              .setTargetLanguageCode("es")
              .build();

      // Start the long-running operation and wait for completion
      Dataset response = client.createDatasetAsync(parent, dataset).get(300, TimeUnit.SECONDS);

      System.out.printf("Dataset created: %s\n", response.getName());
      System.out.printf("Display name: %s\n", response.getDisplayName());
    }
  }
}
// [END translate_v3_translationservice_dataset_create]
