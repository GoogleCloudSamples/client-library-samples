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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_alertpolicyservice_alertpolicy_delete]
import com.google.cloud.monitoring.v3.AlertPolicyServiceClient;
import com.google.monitoring.v3.AlertPolicyName;

public class DeleteAlertPolicy {

  public static void main(String[] args) throws Exception {
    String alertPolicyId = "example-alert_policy_id";
    String projectId = "example-project_id";
    deleteAlertPolicy(alertPolicyId, projectId);
  }

  public static void deleteAlertPolicy(String alertPolicyId, String projectId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (AlertPolicyServiceClient client = AlertPolicyServiceClient.create()) {
      String name = AlertPolicyName.of(projectId, alertPolicyId).toString();
      client.deleteAlertPolicy(name);
      System.out.println("Deleted alert policy: " + name);
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_delete]
