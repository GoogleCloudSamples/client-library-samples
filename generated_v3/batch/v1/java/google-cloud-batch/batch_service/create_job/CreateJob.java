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

package com.google.cloud.batch.v1;

// [START batch_v1_batchservice_job_create]
import com.google.cloud.batch.v1.BatchServiceClient;
import com.google.cloud.batch.v1.Job;
import com.google.cloud.batch.v1.Runnable;
import com.google.cloud.batch.v1.TaskGroup;
import com.google.cloud.batch.v1.TaskSpec;

public class CreateJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String jobId = "example-job-id";
    createJob(projectId, locationId, jobId);
  }

  public static void createJob(String projectId, String locationId, String jobId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Runnable.Script script =
          Runnable.Script.newBuilder()
              .setText("echo Hello world!")
              .build();

      Runnable runnable =
          Runnable.newBuilder()
              .setScript(script)
              .build();

      TaskSpec taskSpec =
          TaskSpec.newBuilder()
              .addRunnables(runnable)
              .build();

      TaskGroup taskGroup =
          TaskGroup.newBuilder()
              .setTaskCount(1)
              .setTaskSpec(taskSpec)
              .build();

      Job job =
          Job.newBuilder()
              .addTaskGroups(taskGroup)
              .build();

      Job response = client.createJob(parent, job, jobId);
      System.out.println("Job created successfully: " + response.getName());
    }
  }
}
// [END batch_v1_batchservice_job_create]
