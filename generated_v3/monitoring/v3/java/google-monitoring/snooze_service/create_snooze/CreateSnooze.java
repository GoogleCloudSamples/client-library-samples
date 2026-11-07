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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_snoozeservice_snooze_create]
import com.google.cloud.monitoring.v3.SnoozeServiceClient;
import com.google.monitoring.v3.Snooze;
import com.google.monitoring.v3.TimeInterval;
import com.google.protobuf.Timestamp;
import java.time.Instant;

public class CreateSnooze {

  public static void main(String[] args) throws Exception {
    String alertPolicyId = "example-alert_policy_id";
    String projectId = "example-project_id";
    createSnooze(alertPolicyId, projectId);
  }

  public static void createSnooze(String alertPolicyId, String projectId) throws Exception {
    try (SnoozeServiceClient client = SnoozeServiceClient.create()) {
      String parent = "projects/" + projectId;

      // Snoozes must start in the present or future and require an explicit duration.
      Instant now = Instant.now();
      Instant oneHourLater = now.plusSeconds(3600);

      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();
      Timestamp endTime =
          Timestamp.newBuilder()
              .setSeconds(oneHourLater.getEpochSecond())
              .setNanos(oneHourLater.getNano())
              .build();

      TimeInterval interval =
          TimeInterval.newBuilder()
              .setStartTime(startTime)
              .setEndTime(endTime)
              .build();

      Snooze.Criteria criteria =
          Snooze.Criteria.newBuilder()
              .addPolicies("projects/" + projectId + "/alertPolicies/" + alertPolicyId)
              .build();

      Snooze snooze =
          Snooze.newBuilder()
              .setDisplayName("Scheduled maintenance snooze")
              .setCriteria(criteria)
              .setInterval(interval)
              .build();

      Snooze response = client.createSnooze(parent, snooze);
      System.out.println("Created snooze: " + response.getName());
    }
  }
}
// [END monitoring_v3_snoozeservice_snooze_create]
