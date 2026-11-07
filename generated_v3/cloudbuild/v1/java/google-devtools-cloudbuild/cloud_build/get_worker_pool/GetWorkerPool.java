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

// [START cloudbuild_v1_cloudbuild_workerpool_get]
import com.google.cloud.devtools.cloudbuild.v1.CloudBuildClient;
import com.google.cloudbuild.v1.GetWorkerPoolRequest;
import com.google.cloudbuild.v1.WorkerPool;
import java.io.IOException;

public class GetWorkerPool {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workerPoolId = "example-worker-pool-id";
    getWorkerPool(projectId, locationId, workerPoolId);
  }

  public static void getWorkerPool(String projectId, String locationId, String workerPoolId)
      throws IOException {
    // Initialize the Cloud Build client using Application Default Credentials
    try (CloudBuildClient client = CloudBuildClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/workerPools/%s", projectId, locationId, workerPoolId);

      GetWorkerPoolRequest request = GetWorkerPoolRequest.newBuilder().setName(name).build();

      WorkerPool response = client.getWorkerPool(request);
      System.out.println("Worker pool retrieved: " + response.getName());
      System.out.println("Worker pool state: " + response.getState());
    }
  }
}
// [END cloudbuild_v1_cloudbuild_workerpool_get]
