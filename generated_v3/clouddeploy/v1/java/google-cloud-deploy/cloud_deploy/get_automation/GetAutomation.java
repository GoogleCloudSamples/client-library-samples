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

package com.google.cloud.clouddeploy.v1;

// [START clouddeploy_v1_clouddeploy_automation_get]
import com.google.cloud.deploy.v1.Automation;
import com.google.cloud.deploy.v1.AutomationName;
import com.google.cloud.deploy.v1.CloudDeployClient;
import java.io.IOException;

public class GetAutomation {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String automationId = "example-automation-id";
    String locationId = "example-location-id";
    String deliveryPipelineId = "example-delivery-pipeline-id";
    getAutomation(projectId, automationId, locationId, deliveryPipelineId);
  }

  public static void getAutomation(
      String projectId, String automationId, String locationId, String deliveryPipelineId)
      throws IOException {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name =
          AutomationName.of(projectId, locationId, deliveryPipelineId, automationId).toString();

      Automation response = client.getAutomation(name);

      System.out.println("Automation resource name: " + response.getName());
      System.out.println("Automation description: " + response.getDescription());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_automation_get]
