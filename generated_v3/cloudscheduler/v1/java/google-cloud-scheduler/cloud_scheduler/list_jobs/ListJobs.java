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

// [START cloudscheduler_v1_cloudscheduler_jobs_list]
import com.google.cloud.scheduler.v1.CloudSchedulerClient;
import com.google.cloud.scheduler.v1.Job;
import java.io.IOException;

public class ListJobs {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listJobs(projectId, locationId);
  }

  public static void listJobs(String projectId, String locationId) throws IOException {
    try (CloudSchedulerClient client = CloudSchedulerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Job job : client.listJobs(parent).iterateAll()) {
        System.out.println("Job name: " + job.getName());
        System.out.println("Schedule: " + job.getSchedule());
        System.out.println("State: " + job.getState());
      }
    }
  }
}
// [END cloudscheduler_v1_cloudscheduler_jobs_list]
