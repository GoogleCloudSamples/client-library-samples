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

// [START run_v2_jobs_set_iam_policy]
import com.google.cloud.run.v2.Job;
import com.google.cloud.run.v2.JobsClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.Policy;
import com.google.iam.v1.SetIamPolicyRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class SetIamPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String jobId = "example-job-id";
    setIamPolicy(projectId, locationId, jobId);
  }

  public static void setIamPolicy(String projectId, String locationId, String jobId)
      throws IOException {
    try (JobsClient client = JobsClient.create()) {
      String resource =
          String.format("projects/%s/locations/%s/jobs/%s", projectId, locationId, jobId);

      // Cloud Run jobs disallow public identifiers such as allAuthenticatedUsers.
      // Retrieve the existing service account associated with the job to bind the role.
      Job job = client.getJob(resource);
      String serviceAccount = job.getTemplate().getTemplate().getServiceAccount();
      String member =
          serviceAccount.isEmpty()
              ? String.format("serviceAccount:example-service-account@%s.iam.gserviceaccount.com", projectId)
              : "serviceAccount:" + serviceAccount;

      Binding binding =
          Binding.newBuilder()
              .setRole("roles/run.viewer")
              .addMembers(member)
              .build();

      Policy policy = Policy.newBuilder().addBindings(binding).build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("bindings").build();

      SetIamPolicyRequest request =
          SetIamPolicyRequest.newBuilder()
              .setResource(resource)
              .setPolicy(policy)
              .setUpdateMask(updateMask)
              .build();

      Policy response = client.setIamPolicy(request);
      System.out.println("Set IAM policy successfully: " + response.getVersion());
    }
  }
}
// [END run_v2_jobs_set_iam_policy]
