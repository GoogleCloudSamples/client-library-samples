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

package com.google.cloud.cloudscheduler.v1beta1;

// [START cloudscheduler_v1beta1_cloudscheduler_job_create]
import com.google.cloud.scheduler.v1beta1.CloudSchedulerClient;
import com.google.cloud.scheduler.v1beta1.HttpMethod;
import com.google.cloud.scheduler.v1beta1.HttpTarget;
import com.google.cloud.scheduler.v1beta1.Job;
import java.io.IOException;

public class CreateJob {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String jobId = "example-job-id";
    createJob(projectId, locationId, jobId);
  }

  public static void createJob(String projectId, String locationId, String jobId)
      throws IOException {
    try (CloudSchedulerClient client = CloudSchedulerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Job.Builder jobBuilder =
          Job.newBuilder()
              .setSchedule("* * * * *")
              .setTimeZone("UTC")
              .setHttpTarget(
                  HttpTarget.newBuilder()
                      .setUri("https://example.com")
                      .setHttpMethod(HttpMethod.GET)
                      .build());

      if (jobId != null && !jobId.isEmpty()) {
        jobBuilder.setName(String.format("%s/jobs/%s", parent, jobId));
      }

      Job job = jobBuilder.build();

      Job response = client.createJob(parent, job);
      System.out.println("Created job: " + response.getName());
    }
  }
}
// [END cloudscheduler_v1beta1_cloudscheduler_job_create]
