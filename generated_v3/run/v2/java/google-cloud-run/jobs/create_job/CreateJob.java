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

// [START run_v2_jobs_job_create]
import com.google.cloud.run.v2.Container;
import com.google.cloud.run.v2.ExecutionTemplate;
import com.google.cloud.run.v2.Job;
import com.google.cloud.run.v2.JobsClient;
import com.google.cloud.run.v2.TaskTemplate;

public class CreateJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    createJob(projectId, locationId, jobId);
  }

  public static void createJob(String projectId, String locationId, String jobId) throws Exception {
    try (JobsClient client = JobsClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Container container =
          Container.newBuilder()
              .setImage("us-docker.pkg.dev/cloudrun/container/job:latest")
              .build();

      TaskTemplate taskTemplate =
          TaskTemplate.newBuilder()
              .addContainers(container)
              .build();

      ExecutionTemplate executionTemplate =
          ExecutionTemplate.newBuilder()
              .setTemplate(taskTemplate)
              .build();

      Job job =
          Job.newBuilder()
              .setTemplate(executionTemplate)
              .build();

      Job response = client.createJobAsync(parent, job, jobId).get();
      System.out.println("Job created: " + response.getName());
    }
  }
}
// [END run_v2_jobs_job_create]
