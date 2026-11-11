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

package com.google.cloud.run.v2;

// [START run_v2_jobs_iampolicy_get]
import com.google.cloud.run.v2.JobsClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    getIamPolicy(projectId, locationId, jobId);
  }

  public static void getIamPolicy(String projectId, String locationId, String jobId) throws Exception {
    // Initialize the client that manages Cloud Run jobs
    try (JobsClient client = JobsClient.create()) {
      String resource = String.format("projects/%s/locations/%s/jobs/%s", projectId, locationId, jobId);

      GetIamPolicyRequest request = GetIamPolicyRequest.newBuilder()
          .setResource(resource)
          .build();

      Policy policy = client.getIamPolicy(request);

      System.out.println("Retrieved IAM policy for job: " + resource);
      System.out.println("Policy version: " + policy.getVersion());
      for (Binding binding : policy.getBindingsList()) {
        System.out.printf("Role: %s, Members: %s%n", binding.getRole(), binding.getMembersList());
      }
    }
  }
}
// [END run_v2_jobs_iampolicy_get]
