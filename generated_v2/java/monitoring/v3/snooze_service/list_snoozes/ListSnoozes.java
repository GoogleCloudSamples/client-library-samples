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

// [START monitoring_v3_snoozeservice_snoozes_list]
import com.google.cloud.monitoring.v3.SnoozeServiceClient;
import com.google.monitoring.v3.Snooze;
import java.io.IOException;

public class ListSnoozes {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listSnoozes(projectId);
  }

  public static void listSnoozes(String projectId) throws Exception {
    // Initialize client within a try-with-resources statement for automatic cleanup.
    try (SnoozeServiceClient client = SnoozeServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);
      for (Snooze snooze : client.listSnoozes(parent).iterateAll()) {
        System.out.println("Snooze name: " + snooze.getName());
        System.out.println("Display name: " + snooze.getDisplayName());
      }
    }
  }
}
// [END monitoring_v3_snoozeservice_snoozes_list]
