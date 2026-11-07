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

package com.google.cloud.storagebatchoperations.v1;

// [START storagebatchoperations_v1_storagebatchoperations_jobs_list]
import com.google.cloud.storagebatchoperations.v1.Job;
import com.google.cloud.storagebatchoperations.v1.ListJobsRequest;
import com.google.cloud.storagebatchoperations.v1.StorageBatchOperationsClient;
import java.io.IOException;

public class ListJobs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Storage Batch Operations restricts job operations to the 'global' location.
    String locationId = "global";
    listJobs(projectId, locationId);
  }

  public static void listJobs(String projectId, String locationId) throws Exception {
    try (StorageBatchOperationsClient client = StorageBatchOperationsClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListJobsRequest request = ListJobsRequest.newBuilder().setParent(parent).build();

      for (Job job : client.listJobs(request).iterateAll()) {
        System.out.println("Job name: " + job.getName());
        System.out.println("Job state: " + job.getState());
      }
    }
  }
}
// [END storagebatchoperations_v1_storagebatchoperations_jobs_list]
