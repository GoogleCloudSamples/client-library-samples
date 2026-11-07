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

// [START monitoring_v3_alertpolicyservice_alertpolicy_get]
import com.google.cloud.monitoring.v3.AlertPolicyServiceClient;
import com.google.monitoring.v3.AlertPolicy;
import com.google.monitoring.v3.AlertPolicyName;
import java.io.IOException;

public class GetAlertPolicy {

  public static void main(String[] args) throws Exception {
    String alertPolicyId = "example-alert-policy-id";
    String projectId = "example-project-id";
    getAlertPolicy(alertPolicyId, projectId);
  }

  public static void getAlertPolicy(String alertPolicyId, String projectId) throws Exception {
    // Initialize client that will be closed when the block finishes
    try (AlertPolicyServiceClient client = AlertPolicyServiceClient.create()) {
      String name = AlertPolicyName.of(projectId, alertPolicyId).toString();
      AlertPolicy alertPolicy = client.getAlertPolicy(name);

      System.out.println("Alert policy retrieved: " + alertPolicy.getName());
      System.out.println("Display name: " + alertPolicy.getDisplayName());
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_get]
