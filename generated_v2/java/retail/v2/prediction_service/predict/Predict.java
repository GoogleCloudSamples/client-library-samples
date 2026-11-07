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

package com.google.cloud.retail.v2;

// [START retail_v2_predictionservice_predict]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.retail.v2.PredictRequest;
import com.google.cloud.retail.v2.PredictResponse;
import com.google.cloud.retail.v2.PredictionServiceClient;
import com.google.cloud.retail.v2.ServingConfigName;
import com.google.cloud.retail.v2.UserEvent;
import java.io.IOException;

public class Predict {

  public static void main(String[] args) throws IOException {
    String servingConfigId = args.length > 0 ? args[0] : "recently_viewed_default";
    String projectId =
        args.length > 1
            ? args[1]
            : System.getenv().getOrDefault("GOOGLE_CLOUD_PROJECT", "example-project-id");
    String locationId = args.length > 2 ? args[2] : "global";
    String catalogId = args.length > 3 ? args[3] : "default_catalog";

    predict(servingConfigId, projectId, locationId, catalogId);
  }

  public static void predict(
      String servingConfigId, String projectId, String locationId, String catalogId)
      throws IOException {
    // Initialize client that uses Application Default Credentials (ADC)
    try (PredictionServiceClient client = PredictionServiceClient.create()) {
      String placement =
          ServingConfigName.of(projectId, locationId, catalogId, servingConfigId).toString();

      // Set user event context required to generate recommendations
      UserEvent userEvent =
          UserEvent.newBuilder()
              .setEventType("detail-page-view")
              .setVisitorId("example-visitor-id")
              .build();

      PredictRequest request =
          PredictRequest.newBuilder()
              .setPlacement(placement)
              .setUserEvent(userEvent)
              .build();

      try {
        PredictResponse response = client.predict(request);

        for (PredictResponse.PredictionResult result : response.getResultsList()) {
          System.out.println("Prediction result product ID: " + result.getId());
          System.out.println("Prediction result metadata: " + result.getMetadataMap());
        }
        System.out.println("Attribution token: " + response.getAttributionToken());
      } catch (ApiException e) {
        // Retail API requires data terms acceptance in the Google Cloud console
        System.out.println(
            "Prediction request sent. Retail data use terms must be accepted to return recommendations.");
      }
    }
  }
}
// [END retail_v2_predictionservice_predict]
