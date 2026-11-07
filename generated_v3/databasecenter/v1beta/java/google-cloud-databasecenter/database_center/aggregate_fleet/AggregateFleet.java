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

package com.google.cloud.databasecenter.v1beta;

// [START databasecenter_v1beta_databasecenter_aggregate_fleet]
import com.google.cloud.databasecenter.v1beta.AggregateFleetRequest;
import com.google.cloud.databasecenter.v1beta.DatabaseCenterClient;
import com.google.cloud.databasecenter.v1beta.DatabaseCenterClient.AggregateFleetPagedResponse;

public class AggregateFleet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    aggregateFleet(projectId);
  }

  public static void aggregateFleet(String projectId) throws Exception {
    // Initialize client that will be automatically closed at the end of the block
    try (DatabaseCenterClient client = DatabaseCenterClient.create()) {
      String parent = String.format("projects/%s", projectId);

      AggregateFleetRequest request =
          AggregateFleetRequest.newBuilder()
              .setParent(parent)
              .build();

      AggregateFleetPagedResponse response = client.aggregateFleet(request);
      for (var element : response.iterateAll()) {
        System.out.println("Fleet aggregate: " + element);
      }
    }
  }
}
// [END databasecenter_v1beta_databasecenter_aggregate_fleet]
