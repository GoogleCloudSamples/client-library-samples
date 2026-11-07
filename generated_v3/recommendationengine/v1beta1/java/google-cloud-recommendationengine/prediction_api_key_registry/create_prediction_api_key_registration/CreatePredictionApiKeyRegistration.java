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

package com.google.cloud.recommendationengine.v1beta1;

// [START recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_create]
import com.google.cloud.recommendationengine.v1beta1.EventStoreName;
import com.google.cloud.recommendationengine.v1beta1.PredictionApiKeyRegistration;
import com.google.cloud.recommendationengine.v1beta1.PredictionApiKeyRegistryClient;

public class CreatePredictionApiKeyRegistration {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    createPredictionApiKeyRegistration(projectId, locationId);
  }

  public static void createPredictionApiKeyRegistration(String projectId, String locationId)
      throws Exception {
    try (PredictionApiKeyRegistryClient client = PredictionApiKeyRegistryClient.create()) {
      String parent =
          EventStoreName.of(projectId, locationId, "default_catalog", "default_event_store")
              .toString();
      PredictionApiKeyRegistration predictionApiKeyRegistration =
          PredictionApiKeyRegistration.newBuilder()
              .setApiKey("example-api-key")
              .build();

      PredictionApiKeyRegistration response =
          client.createPredictionApiKeyRegistration(parent, predictionApiKeyRegistration);

      System.out.println("Created prediction API key registration: " + response.getApiKey());
    }
  }
}
// [END recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_create]
