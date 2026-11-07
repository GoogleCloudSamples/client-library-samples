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

// [START run_v2_jobs_job_update]
import com.google.cloud.run.v2.Job;
import com.google.cloud.run.v2.JobName;
import com.google.cloud.run.v2.JobsClient;
import com.google.cloud.run.v2.UpdateJobRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    updateJob(projectId, locationId, jobId);
  }

  public static void updateJob(String projectId, String locationId, String jobId) throws Exception {
    try (JobsClient client = JobsClient.create()) {
      JobName jobName = JobName.of(projectId, locationId, jobId);
      Job existingJob = client.getJob(jobName);

      // Mutate a label while preserving the existing job configuration and etag for full replacement
      Job job = existingJob.toBuilder()
          .putLabels("env", "staging")
          .build();

      UpdateJobRequest request = UpdateJobRequest.newBuilder()
          .setJob(job)
          .build();

      Job updatedJob = client.updateJobAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Updated job: " + updatedJob.getName());
    }
  }
}
// [END run_v2_jobs_job_update]
