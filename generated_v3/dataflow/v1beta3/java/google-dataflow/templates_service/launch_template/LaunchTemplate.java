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

package com.google.cloud.dataflow.v1beta3;

// [START dataflow_v1beta3_templatesservice_launch_template]
import com.google.dataflow.v1beta3.LaunchTemplateParameters;
import com.google.dataflow.v1beta3.LaunchTemplateRequest;
import com.google.dataflow.v1beta3.LaunchTemplateResponse;
import com.google.dataflow.v1beta3.TemplatesServiceClient;
import java.io.IOException;

public class LaunchTemplate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String gcsPath = "gs://example-bucket/templates/example-template";
    launchTemplate(projectId, locationId, gcsPath);
  }

  public static void launchTemplate(String projectId, String locationId, String gcsPath)
      throws IOException {
    try (TemplatesServiceClient client = TemplatesServiceClient.create()) {
      // Configure launch parameters including the unique Dataflow job name
      LaunchTemplateParameters launchParameters =
          LaunchTemplateParameters.newBuilder()
              .setJobName("example-template-job")
              .build();

      LaunchTemplateRequest request =
          LaunchTemplateRequest.newBuilder()
              .setProjectId(projectId)
              .setLocation(locationId)
              .setGcsPath(gcsPath)
              .setLaunchParameters(launchParameters)
              .build();

      LaunchTemplateResponse response = client.launchTemplate(request);
      System.out.println("Launched job ID: " + response.getJob().getId());
      System.out.println("Job state: " + response.getJob().getCurrentState());
    }
  }
}
// [END dataflow_v1beta3_templatesservice_launch_template]
