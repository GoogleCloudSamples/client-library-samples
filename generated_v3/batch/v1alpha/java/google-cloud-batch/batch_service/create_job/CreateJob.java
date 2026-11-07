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

package com.google.cloud.batch.v1alpha;

// [START batch_v1alpha_batchservice_job_create]
import com.google.cloud.batch.v1alpha.BatchServiceClient;
import com.google.cloud.batch.v1alpha.CreateJobRequest;
import com.google.cloud.batch.v1alpha.Job;
import com.google.cloud.batch.v1alpha.LogsPolicy;
import com.google.cloud.batch.v1alpha.Runnable;
import com.google.cloud.batch.v1alpha.TaskGroup;
import com.google.cloud.batch.v1alpha.TaskSpec;
import java.io.IOException;

public class CreateJob {

  public static void createJob(String projectId, String locationId) throws IOException {
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Runnable.Script script =
          Runnable.Script.newBuilder()
              .setText("echo Hello world from Google Cloud Batch!")
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
              .setLogsPolicy(
                  LogsPolicy.newBuilder()
                      .setDestination(LogsPolicy.Destination.CLOUD_LOGGING))
              .build();

      CreateJobRequest request =
          CreateJobRequest.newBuilder()
              .setParent(parent)
              .setJob(job)
              .build();

      Job response = client.createJob(request);
      System.out.println("Job created successfully: " + response.getName());
    }
  }
}
// [END batch_v1alpha_batchservice_job_create]
