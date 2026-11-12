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

package com.google.cloud.discoveryengine.v1beta;

// [START discoveryengine_v1beta_rankservice_rank]
import com.google.cloud.discoveryengine.v1beta.RankRequest;
import com.google.cloud.discoveryengine.v1beta.RankResponse;
import com.google.cloud.discoveryengine.v1beta.RankServiceClient;
import com.google.cloud.discoveryengine.v1beta.RankingConfigName;
import com.google.cloud.discoveryengine.v1beta.RankingRecord;
import java.io.IOException;

public class Rank {

  public static void main(String[] args) throws IOException {
    String projectNumId = "123456789012";
    String locationId = "global";
    rank(projectNumId, locationId);
  }

  public static void rank(String projectNumId, String locationId) throws IOException {
    try (RankServiceClient client = RankServiceClient.create()) {
      String rankingConfig =
          RankingConfigName.of(projectNumId, locationId, "default_ranking_config").toString();
      RankingRecord records =
          RankingRecord.newBuilder()
              .setId("record-1")
              .setTitle("Example Document Title")
              .setContent("Example document content for ranking.")
              .build();

      RankRequest request =
          RankRequest.newBuilder()
              .setRankingConfig(rankingConfig)
              .setQuery("example search query")
              .addRecords(records)
              .build();

      RankResponse response = client.rank(request);

      for (RankingRecord record : response.getRecordsList()) {
        System.out.printf("Record ID: %s, Score: %f%n", record.getId(), record.getScore());
      }
    }
  }
}
// [END discoveryengine_v1beta_rankservice_rank]
