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

// [START clouddeploy_v1_clouddeploy_automationruns_list]
import com.google.cloud.deploy.v1.AutomationRun;
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.DeliveryPipelineName;

public class ListAutomationRuns {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String deliveryPipelineId = "example-delivery-pipeline-id";
    listAutomationRuns(projectId, locationId, deliveryPipelineId);
  }

  public static void listAutomationRuns(
      String projectId, String locationId, String deliveryPipelineId) throws Exception {
    // Initialize the Cloud Deploy client using Application Default Credentials
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String parent =
          DeliveryPipelineName.of(projectId, locationId, deliveryPipelineId).toString();

      // Retrieve and display automation runs associated with the target delivery pipeline
      for (AutomationRun automationRun : client.listAutomationRuns(parent).iterateAll()) {
        System.out.println("Automation run: " + automationRun.getName());
        System.out.println("State: " + automationRun.getState());
      }
    }
  }
}
// [END clouddeploy_v1_clouddeploy_automationruns_list]
