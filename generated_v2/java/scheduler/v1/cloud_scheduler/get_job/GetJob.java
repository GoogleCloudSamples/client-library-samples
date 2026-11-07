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

package com.google.cloud.cloudscheduler.v1;

// [START cloudscheduler_v1_cloudscheduler_job_get]
import com.google.cloud.scheduler.v1.CloudSchedulerClient;
import com.google.cloud.scheduler.v1.Job;
import com.google.cloud.scheduler.v1.JobName;
import java.io.IOException;

public class GetJob {

  public static void getJob(String projectId, String locationId, String jobId) throws IOException {
    try (CloudSchedulerClient client = CloudSchedulerClient.create()) {
      String name = JobName.of(projectId, locationId, jobId).toString();
      Job response = client.getJob(name);

      System.out.println("Job name: " + response.getName());
      System.out.println("Job schedule: " + response.getSchedule());
      System.out.println("Job state: " + response.getState());
    }
  }
}
// [END cloudscheduler_v1_cloudscheduler_job_get]
