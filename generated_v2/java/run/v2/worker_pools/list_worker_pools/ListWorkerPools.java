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

// [START run_v2_workerpools_workerpools_list]
import com.google.cloud.run.v2.LocationName;
import com.google.cloud.run.v2.WorkerPool;
import com.google.cloud.run.v2.WorkerPoolsClient;
import java.io.IOException;

public class ListWorkerPools {

  public static void main(String[] args) throws IOException {
    if (args.length > 0) {
      String projectId = args[0];
      listWorkerPools(projectId);
    }
  }

  public static void listWorkerPools(String projectId) throws IOException {
    try (WorkerPoolsClient client = WorkerPoolsClient.create()) {
      String location = "us-central1";
      String parent = LocationName.of(projectId, location).toString();

      for (WorkerPool workerPool : client.listWorkerPools(parent).iterateAll()) {
        System.out.println("Worker pool: " + workerPool.getName());
      }
    }
  }
}
// [END run_v2_workerpools_workerpools_list]
