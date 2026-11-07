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

package com.google.cloud.pubsub.v1;

// [START pubsub_v1_subscriber_snapshots_list]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.pubsub.v1.Snapshot;

public class ListSnapshots {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listSnapshots(projectId);
  }

  public static void listSnapshots(String projectId) throws Exception {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      String project = "projects/" + projectId;
      for (Snapshot snapshot : client.listSnapshots(project).iterateAll()) {
        System.out.println("Snapshot name: " + snapshot.getName());
      }
    }
  }
}
// [END pubsub_v1_subscriber_snapshots_list]
