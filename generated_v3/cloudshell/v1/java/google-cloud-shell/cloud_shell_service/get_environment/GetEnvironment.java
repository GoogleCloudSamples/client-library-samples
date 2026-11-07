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

package com.google.cloud.cloudshell.v1;

// [START cloudshell_v1_cloudshellservice_environment_get]
import com.google.cloud.shell.v1.CloudShellServiceClient;
import com.google.cloud.shell.v1.Environment;
import com.google.cloud.shell.v1.EnvironmentName;
import java.io.IOException;

public class GetEnvironment {

  public static void main(String[] args) throws IOException {
    // Set userId to "me" for the authenticated caller or provide a user email address.
    String userId = "example-user-id";
    // Set environmentId to "default" for the primary Cloud Shell environment.
    String environmentId = "default";
    getEnvironment(userId, environmentId);
  }

  public static void getEnvironment(String userId, String environmentId) throws IOException {
    try (CloudShellServiceClient client = CloudShellServiceClient.create()) {
      String name = EnvironmentName.of(userId, environmentId).toString();

      Environment response = client.getEnvironment(name);

      System.out.println("Environment: " + response.getName());
      System.out.println("State: " + response.getState());
      System.out.println("Docker Image: " + response.getDockerImage());
    }
  }
}
// [END cloudshell_v1_cloudshellservice_environment_get]
