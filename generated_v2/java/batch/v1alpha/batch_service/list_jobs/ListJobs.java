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

// [START batch_v1alpha_batchservice_jobs_list]
import com.google.cloud.batch.v1alpha.BatchServiceClient;
import com.google.cloud.batch.v1alpha.Job;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ListJobs {

  public static void main(String[] args) throws IOException {
    // Suppress informational logging from gRPC and transport layers to standard error.
    Logger.getLogger("").setLevel(Level.WARNING);

    String projectId = "example-project-id";
    String locationId = "example-location-id";
    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      locationId = args[1];
    }
    listJobs(projectId, locationId);
  }

  public static void listJobs(String projectId, String locationId) throws IOException {
    // Suppress informational logging from gRPC and transport layers to standard error.
    Logger.getLogger("").setLevel(Level.WARNING);

    try (BatchServiceClient client = BatchServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Job job : client.listJobs(parent).iterateAll()) {
        System.out.printf("Job: %s%n", job.getName());
      }
    }
  }
}
// [END batch_v1alpha_batchservice_jobs_list]
