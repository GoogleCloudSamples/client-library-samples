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

package com.google.cloud.discoveryengine.v1;

// [START discoveryengine_v1_rankservice_rank]
import com.google.cloud.discoveryengine.v1.RankRequest;
import com.google.cloud.discoveryengine.v1.RankResponse;
import com.google.cloud.discoveryengine.v1.RankServiceClient;
import com.google.cloud.discoveryengine.v1.RankingConfigName;
import com.google.cloud.discoveryengine.v1.RankingRecord;
import java.util.Arrays;
import java.util.List;

public class Rank {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String query = "example-query";
    rank(projectId, locationId, query);
  }

  public static void rank(String projectId, String locationId, String query) throws Exception {
    try (RankServiceClient client = RankServiceClient.create()) {
      List<RankingRecord> records =
          Arrays.asList(
              RankingRecord.newBuilder()
                  .setId("record-1")
                  .setTitle("Introduction to Google Cloud")
                  .setContent("An overview of Google Cloud services and infrastructure.")
                  .build(),
              RankingRecord.newBuilder()
                  .setId("record-2")
                  .setTitle("Discovery Engine Overview")
                  .setContent("Explore search and ranking capabilities in Discovery Engine.")
                  .build());

      String rankingConfig =
          RankingConfigName.of(projectId, locationId, "default_ranking_config").toString();

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
// [END discoveryengine_v1_rankservice_rank]
