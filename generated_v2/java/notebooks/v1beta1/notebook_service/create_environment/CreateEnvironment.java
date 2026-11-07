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

// [START notebooks_v1beta1_notebookservice_environment_create]
import com.google.cloud.notebooks.v1beta1.ContainerImage;
import com.google.cloud.notebooks.v1beta1.CreateEnvironmentRequest;
import com.google.cloud.notebooks.v1beta1.Environment;
import com.google.cloud.notebooks.v1beta1.NotebookServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateEnvironment {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String environmentId = "example-environment-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createEnvironment(environmentId, projectId, locationId);
  }

  public static void createEnvironment(String environmentId, String projectId, String locationId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ContainerImage containerImage =
          ContainerImage.newBuilder()
              .setRepository("gcr.io/deeplearning-platform-release/base-cpu")
              .setTag("latest")
              .build();

      Environment environment =
          Environment.newBuilder()
              .setDisplayName("Sample Environment")
              .setDescription("Sample environment for notebook instances")
              .setContainerImage(containerImage)
              .build();

      CreateEnvironmentRequest request =
          CreateEnvironmentRequest.newBuilder()
              .setParent(parent)
              .setEnvironmentId(environmentId)
              .setEnvironment(environment)
              .build();

      Environment response = client.createEnvironmentAsync(request).get(15, TimeUnit.MINUTES);
      System.out.println("Created environment: " + response.getName());
    }
  }
}
// [END notebooks_v1beta1_notebookservice_environment_create]
