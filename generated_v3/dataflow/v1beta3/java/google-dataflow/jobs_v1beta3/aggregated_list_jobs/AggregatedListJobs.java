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

package com.google.cloud.dataflow.v1beta3;

// [START dataflow_v1beta3_jobsv1beta3_aggregated_list_jobs]
import com.google.dataflow.v1beta3.Job;
import com.google.dataflow.v1beta3.JobsV1Beta3Client;
import com.google.dataflow.v1beta3.ListJobsRequest;
import java.io.IOException;

public class AggregatedListJobs {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    aggregatedListJobs(projectId);
  }

  public static void aggregatedListJobs(String projectId) throws IOException {
    try (JobsV1Beta3Client client = JobsV1Beta3Client.create()) {
      ListJobsRequest request = ListJobsRequest.newBuilder()
          .setProjectId(projectId)
          .build();

      for (Job job : client.aggregatedListJobs(request).iterateAll()) {
        System.out.printf("Job ID: %s, Name: %s, State: %s%n",
            job.getId(), job.getName(), job.getCurrentState());
      }
    }
  }
}
// [END dataflow_v1beta3_jobsv1beta3_aggregated_list_jobs]
