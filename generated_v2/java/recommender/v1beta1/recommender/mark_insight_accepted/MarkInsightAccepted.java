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

package com.google.cloud.recommender.v1beta1;

// [START recommender_v1beta1_recommender_mark_insight_accepted]
import com.google.cloud.recommender.v1beta1.Insight;
import com.google.cloud.recommender.v1beta1.InsightName;
import com.google.cloud.recommender.v1beta1.MarkInsightAcceptedRequest;
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import java.io.IOException;

public class MarkInsightAccepted {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String insightTypeId = "example-insight-type-id";
    String insightId = "example-insight-id";
    String etag = "example-etag";
    markInsightAccepted(projectId, locationId, insightTypeId, insightId, etag);
  }

  public static void markInsightAccepted(
      String projectId, String locationId, String insightTypeId, String insightId, String etag)
      throws IOException {
    try (RecommenderClient client = RecommenderClient.create()) {
      String name = InsightName.of(projectId, locationId, insightTypeId, insightId).toString();
      if (!etag.startsWith("\"")) {
        etag = String.format("\"%s\"", etag);
      }

      MarkInsightAcceptedRequest request =
          MarkInsightAcceptedRequest.newBuilder()
              .setName(name)
              .setEtag(etag)
              .build();

      Insight response = client.markInsightAccepted(request);
      System.out.println("Marked insight as accepted: " + response.getName());
      System.out.println("Insight state: " + response.getStateInfo().getState());
    }
  }
}
// [END recommender_v1beta1_recommender_mark_insight_accepted]
