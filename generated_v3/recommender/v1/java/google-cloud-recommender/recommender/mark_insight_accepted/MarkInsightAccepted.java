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

package com.google.cloud.recommender.v1;

// [START recommender_v1_recommender_mark_insight_accepted]
import com.google.cloud.recommender.v1.Insight;
import com.google.cloud.recommender.v1.InsightName;
import com.google.cloud.recommender.v1.RecommenderClient;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

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
      String name =
          InsightName.ofProjectLocationInsightTypeInsightName(
                  projectId, locationId, insightTypeId, insightId)
              .toString();
      Map<String, String> stateMetadata = Collections.singletonMap("accepted-by", "example-user");

      // Ensure the ETag is enclosed in double quotes as required by the Recommender API.
      if (!etag.startsWith("\"")) {
        etag = "\"" + etag + "\"";
      }

      Insight insight = client.markInsightAccepted(name, stateMetadata, etag);
      System.out.println("Marked insight accepted: " + insight.getName());
      System.out.println("State: " + insight.getStateInfo().getState());
    }
  }
}
// [END recommender_v1_recommender_mark_insight_accepted]
