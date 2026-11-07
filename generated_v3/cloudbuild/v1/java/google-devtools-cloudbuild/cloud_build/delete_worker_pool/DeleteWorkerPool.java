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

package com.google.cloud.cloudbuild.v1;

// [START cloudbuild_v1_cloudbuild_workerpool_delete]
import com.google.cloud.devtools.cloudbuild.v1.CloudBuildClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class DeleteWorkerPool {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workerPoolId = "example-worker-pool-id";
    deleteWorkerPool(projectId, locationId, workerPoolId);
  }

  public static void deleteWorkerPool(String projectId, String locationId, String workerPoolId)
      throws IOException, InterruptedException, ExecutionException {
    try (CloudBuildClient client = CloudBuildClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/workerPools/%s", projectId, locationId, workerPoolId);

      // DeleteWorkerPool is a long-running operation; wait for it to complete.
      client.deleteWorkerPoolAsync(name).get();
      System.out.printf("Deleted worker pool: %s%n", name);
    }
  }
}
// [END cloudbuild_v1_cloudbuild_workerpool_delete]
