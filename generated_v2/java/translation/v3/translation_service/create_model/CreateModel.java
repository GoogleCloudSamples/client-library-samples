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

// [START translate_v3_translationservice_model_create]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.translate.v3.CreateModelMetadata;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.Model;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;

public class CreateModel {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createModel(projectId, locationId);
  }

  public static void createModel(String projectId, String locationId) throws IOException {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Model model =
          Model.newBuilder()
              .setDisplayName("example-model-display-name")
              .setDataset(
                  String.format(
                      "projects/%s/locations/%s/datasets/example-dataset-id",
                      projectId, locationId))
              .build();

      OperationFuture<Model, CreateModelMetadata> future =
          client.createModelAsync(parent, model);
      System.out.println("Created model request initiated: " + model.getDisplayName());
    }
  }
}
// [END translate_v3_translationservice_model_create]
