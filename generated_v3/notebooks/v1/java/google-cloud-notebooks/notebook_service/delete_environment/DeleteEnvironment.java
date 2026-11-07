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

package com.google.cloud.notebooks.v1;

// [START notebooks_v1_notebookservice_environment_delete]
import com.google.cloud.notebooks.v1.NotebookServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteEnvironment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String environmentId = "example-environment_id";
    deleteEnvironment(projectId, locationId, environmentId);
  }

  public static void deleteEnvironment(String projectId, String locationId, String environmentId)
      throws Exception {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/environments/%s", projectId, locationId, environmentId);
      client.deleteEnvironmentAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted environment: %s%n", name);
    }
  }
}
// [END notebooks_v1_notebookservice_environment_delete]
