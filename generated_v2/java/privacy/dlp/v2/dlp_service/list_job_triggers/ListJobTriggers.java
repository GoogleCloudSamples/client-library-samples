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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_jobtriggers_list]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.JobTrigger;
import com.google.privacy.dlp.v2.ListJobTriggersRequest;

public class ListJobTriggers {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listJobTriggers(projectId);
  }

  public static void listJobTriggers(String projectId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      ListJobTriggersRequest request =
          ListJobTriggersRequest.newBuilder().setParent(parent).build();

      for (JobTrigger trigger : client.listJobTriggers(request).iterateAll()) {
        System.out.printf("Job trigger: %s%n", trigger.getName());
        System.out.printf("Display name: %s%n", trigger.getDisplayName());
        System.out.printf("Status: %s%n", trigger.getStatus());
      }
    }
  }
}
// [END dlp_v2_dlpservice_jobtriggers_list]
