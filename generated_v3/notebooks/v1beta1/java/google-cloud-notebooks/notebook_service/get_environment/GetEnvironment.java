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

package com.google.cloud.notebooks.v1beta1;

// [START notebooks_v1beta1_notebookservice_environment_get]
import com.google.cloud.notebooks.v1beta1.Environment;
import com.google.cloud.notebooks.v1beta1.GetEnvironmentRequest;
import com.google.cloud.notebooks.v1beta1.NotebookServiceClient;

public class GetEnvironment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String environmentId = "example-environment-id";
    getEnvironment(projectId, locationId, environmentId);
  }

  public static void getEnvironment(String projectId, String locationId, String environmentId)
      throws Exception {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/environments/%s", projectId, locationId, environmentId);

      GetEnvironmentRequest request = GetEnvironmentRequest.newBuilder().setName(name).build();
      Environment response = client.getEnvironment(request);

      System.out.println("Environment name: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END notebooks_v1beta1_notebookservice_environment_get]
