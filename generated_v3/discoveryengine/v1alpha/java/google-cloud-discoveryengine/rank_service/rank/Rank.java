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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_rankservice_rank]
import com.google.cloud.discoveryengine.v1alpha.RankRequest;
import com.google.cloud.discoveryengine.v1alpha.RankResponse;
import com.google.cloud.discoveryengine.v1alpha.RankServiceClient;
import com.google.cloud.discoveryengine.v1alpha.RankingRecord;
import java.util.Arrays;
import java.util.List;

public class Rank {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String rankingConfigId = "default_ranking_config";
    String query = "what is Google Cloud";
    rank(projectId, locationId, rankingConfigId, query);
  }

  public static void rank(
      String projectId, String locationId, String rankingConfigId, String query)
      throws Exception {
    try (RankServiceClient client = RankServiceClient.create()) {
      String rankingConfig =
          String.format(
              "projects/%s/locations/%s/rankingConfigs/%s",
              projectId, locationId, rankingConfigId);

      List<RankingRecord> records =
          Arrays.asList(
              RankingRecord.newBuilder()
                  .setId("record-1")
                  .setTitle("Google Cloud Overview")
                  .setContent(
                      "Google Cloud offers a suite of cloud computing services including computing,"
                          + " data storage, data analytics, and machine learning.")
                  .build(),
              RankingRecord.newBuilder()
                  .setId("record-2")
                  .setTitle("Introduction to Machine Learning")
                  .setContent(
                      "Machine learning is a field devoted to understanding and building methods"
                          + " that learn from data.")
                  .build());

      RankRequest request =
          RankRequest.newBuilder()
              .setRankingConfig(rankingConfig)
              .setQuery(query)
              .addAllRecords(records)
              .build();

      RankResponse response = client.rank(request);
      for (RankingRecord record : response.getRecordsList()) {
        System.out.printf("Record ID: %s, Score: %f%n", record.getId(), record.getScore());
      }
    }
  }
}
// [END discoveryengine_v1alpha_rankservice_rank]
