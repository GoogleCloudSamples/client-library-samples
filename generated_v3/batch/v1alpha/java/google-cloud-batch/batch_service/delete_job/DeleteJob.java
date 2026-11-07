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

// [START batch_v1alpha_batchservice_job_delete]
import com.google.cloud.batch.v1alpha.BatchServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    deleteJob(projectId, locationId, jobId);
  }

  public static void deleteJob(String projectId, String locationId, String jobId) throws Exception {
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s/jobs/%s", projectId, locationId, jobId);

      // DeleteJob is a long-running operation; wait for it to complete.
      client.deleteJobAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Job deleted: %s%n", name);
    }
  }
}
// [END batch_v1alpha_batchservice_job_delete]
