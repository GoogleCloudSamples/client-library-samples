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

// [START monitoring_v3_snoozeservice_snooze_get]
import com.google.cloud.monitoring.v3.SnoozeServiceClient;
import com.google.monitoring.v3.Snooze;
import com.google.monitoring.v3.SnoozeName;

public class GetSnooze {

  public static void main(String[] args) throws Exception {
    String snoozeId = "example-snooze_id";
    String projectId = "example-project_id";
    getSnooze(snoozeId, projectId);
  }

  public static void getSnooze(String snoozeId, String projectId) throws Exception {
    // Initialize client that will be closed when the block finishes
    try (SnoozeServiceClient client = SnoozeServiceClient.create()) {
      String name = SnoozeName.of(projectId, snoozeId).toString();
      Snooze response = client.getSnooze(name);
      System.out.println("Retrieved Snooze: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
    }
  }
}
// [END monitoring_v3_snoozeservice_snooze_get]
