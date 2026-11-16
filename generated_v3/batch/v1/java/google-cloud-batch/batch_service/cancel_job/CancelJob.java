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

// [START batch_v1_batchservice_job_cancel]
import com.google.api.gax.rpc.UnknownException;
import com.google.cloud.batch.v1.BatchServiceClient;
import java.util.concurrent.ExecutionException;

public class CancelJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    cancelJob(projectId, locationId, jobId);
  }

  public static void cancelJob(String projectId, String locationId, String jobId) throws Exception {
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s/jobs/%s", projectId, locationId, jobId);

      try {
        client.cancelJobAsync(name).get();
      } catch (ExecutionException e) {
        // The service operation returns a Job resource in the response field instead
        // of CancelJobResponse, which causes the client library to encounter an unpacking error
        // even though the operation succeeded on the server.
        if (e.getCause() instanceof UnknownException
            && e.getCause().getMessage().contains("succeeded")) {
          // Operation completed successfully on the server.
        } else {
          throw e;
        }
      }
      System.out.println("Job cancelled successfully: " + name);
    }
  }
}
// [END batch_v1_batchservice_job_cancel]
