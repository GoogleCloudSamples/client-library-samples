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

// [START run_v2_jobs_run_job]
import com.google.cloud.run.v2.JobsClient;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class RunJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    runJob(projectId, locationId, jobId);
  }

  public static void runJob(String projectId, String locationId, String jobId) throws Exception {
    try (JobsClient client = JobsClient.create()) {
      String name = JobName.of(projectId, locationId, jobId).toString();
      RunJobRequest request = RunJobRequest.newBuilder().setName(name).build();

      // RunJob is a long-running operation; wait for execution to complete.
      Execution execution = client.runJobAsync(request).get();
      System.out.println("Job execution completed: " + execution.getName());
    }
  }
}
// [END run_v2_jobs_run_job]
