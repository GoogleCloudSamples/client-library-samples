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

// [START dlp_v2_dlpservice_activate_job_trigger]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.ActivateJobTriggerRequest;
import com.google.privacy.dlp.v2.DlpJob;
import java.io.IOException;

public class ActivateJobTrigger {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String jobTriggerId = "example-job_trigger_id";
    activateJobTrigger(projectId, jobTriggerId);
  }

  public static void activateJobTrigger(String projectId, String jobTriggerId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      // Construct the resource name using the template projects/{project_id}/jobTriggers/{job_trigger_id}
      String name = String.format("projects/%s/jobTriggers/%s", projectId, jobTriggerId);

      ActivateJobTriggerRequest request =
          ActivateJobTriggerRequest.newBuilder().setName(name).build();

      DlpJob response = client.activateJobTrigger(request);
      System.out.println("Activated job trigger: " + response.getName());
      System.out.println("Job state: " + response.getState());
    }
  }
}
// [END dlp_v2_dlpservice_activate_job_trigger]
