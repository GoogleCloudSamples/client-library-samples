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

// [START dlp_v2_dlpservice_jobtrigger_get]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.GetJobTriggerRequest;
import com.google.privacy.dlp.v2.JobTrigger;

public class GetJobTrigger {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String jobTriggerId = "example-job-trigger-id";
    getJobTrigger(projectId, jobTriggerId);
  }

  public static void getJobTrigger(String projectId, String jobTriggerId) throws Exception {
    // Initialize client that sends requests to Cloud Data Loss Prevention (DLP) API.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String name = String.format("projects/%s/jobTriggers/%s", projectId, jobTriggerId);

      GetJobTriggerRequest request = GetJobTriggerRequest.newBuilder()
          .setName(name)
          .build();

      JobTrigger response = client.getJobTrigger(request);

      System.out.println("Job trigger retrieved: " + response.getName());
      System.out.println("Status: " + response.getStatus());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_get]
