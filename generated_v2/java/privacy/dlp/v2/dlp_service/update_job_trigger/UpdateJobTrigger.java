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

// [START dlp_v2_dlpservice_jobtrigger_update]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.JobTrigger;
import com.google.privacy.dlp.v2.UpdateJobTriggerRequest;
import com.google.protobuf.FieldMask;

public class UpdateJobTrigger {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String jobTriggerId = "example-job-trigger-id";
    updateJobTrigger(projectId, jobTriggerId);
  }

  public static void updateJobTrigger(String projectId, String jobTriggerId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String name = String.format("projects/%s/jobTriggers/%s", projectId, jobTriggerId);
      JobTrigger jobTrigger =
          JobTrigger.newBuilder()
              .setDescription("Updated DLP Job Trigger Description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      UpdateJobTriggerRequest request =
          UpdateJobTriggerRequest.newBuilder()
              .setName(name)
              .setJobTrigger(jobTrigger)
              .setUpdateMask(updateMask)
              .build();

      JobTrigger response = client.updateJobTrigger(request);
      System.out.println("Updated job trigger: " + response.getName());
      System.out.println("Updated description: " + response.getDescription());
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_update]
