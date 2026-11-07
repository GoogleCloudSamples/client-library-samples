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

package com.google.cloud.run.v2;

// [START run_v2_workerpools_workerpool_create]
import com.google.cloud.run.v2.Container;
import com.google.cloud.run.v2.WorkerPool;
import com.google.cloud.run.v2.WorkerPoolRevisionTemplate;
import com.google.cloud.run.v2.WorkerPoolsClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateWorkerPool {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String workerPoolId = "example-worker-pool-id";
    String locationId = "us-central1";
    createWorkerPool(projectId, workerPoolId, locationId);
  }

  public static void createWorkerPool(String projectId, String workerPoolId, String locationId)
      throws Exception {
    try (WorkerPoolsClient client = WorkerPoolsClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      WorkerPool workerPool =
          WorkerPool.newBuilder()
              .setTemplate(
                  WorkerPoolRevisionTemplate.newBuilder()
                      .addContainers(
                          Container.newBuilder()
                              .setImage("us-docker.pkg.dev/cloudrun/container/hello")
                              .build())
                      .build())
              .build();

      // CreateWorkerPool is a long-running operation. Wait for completion.
      WorkerPool response =
          client.createWorkerPoolAsync(parent, workerPool, workerPoolId).get(10, TimeUnit.MINUTES);

      System.out.println("Created Worker Pool: " + response.getName());
    }
  }
}
// [END run_v2_workerpools_workerpool_create]
