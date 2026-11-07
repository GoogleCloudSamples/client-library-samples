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

// [START recommendationengine_v1beta1_predictionservice_predict]
import com.google.cloud.recommendationengine.v1beta1.PlacementName;
import com.google.cloud.recommendationengine.v1beta1.PredictResponse;
import com.google.cloud.recommendationengine.v1beta1.PredictionServiceClient;
import com.google.cloud.recommendationengine.v1beta1.UserEvent;
import com.google.cloud.recommendationengine.v1beta1.UserInfo;

public class Predict {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String catalogId = "default_catalog";
    String eventStoreId = "default_event_store";
    String placementId = "recently_viewed_default";
    predict(projectId, locationId, catalogId, eventStoreId, placementId);
  }

  public static void predict(
      String projectId,
      String locationId,
      String catalogId,
      String eventStoreId,
      String placementId)
      throws Exception {
    try (PredictionServiceClient client = PredictionServiceClient.create()) {
      String name =
          PlacementName.of(projectId, locationId, catalogId, eventStoreId, placementId).toString();
      UserEvent userEvent =
          UserEvent.newBuilder()
              .setEventType("home-page-view")
              .setUserInfo(UserInfo.newBuilder().setVisitorId("visitor_0").build())
              .build();

      PredictionServiceClient.PredictPagedResponse response = client.predict(name, userEvent);
      for (PredictionServiceClient.PredictPage page : response.iteratePages()) {
        for (PredictResponse.PredictionResult result : page.getResponse().getResultsList()) {
          System.out.printf("Item ID: %s%n", result.getId());
        }
      }
    }
  }
}
// [END recommendationengine_v1beta1_predictionservice_predict]
