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

// [START cloudscheduler_v1_cloudscheduler_job_update]
import com.google.cloud.scheduler.v1.CloudSchedulerClient;
import com.google.cloud.scheduler.v1.Job;
import com.google.cloud.scheduler.v1.JobName;
import com.google.protobuf.FieldMask;

public class UpdateJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String jobId = "example-job-id";
    updateJob(projectId, locationId, jobId);
  }

  public static void updateJob(String projectId, String locationId, String jobId) throws Exception {
    try (CloudSchedulerClient client = CloudSchedulerClient.create()) {
      Job job =
          Job.newBuilder()
              .setName(JobName.of(projectId, locationId, jobId).toString())
              .setDescription("Updated Cloud Scheduler job description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      Job response = client.updateJob(job, updateMask);
      System.out.println("Job updated: " + response.getName());
    }
  }
}
// [END cloudscheduler_v1_cloudscheduler_job_update]
