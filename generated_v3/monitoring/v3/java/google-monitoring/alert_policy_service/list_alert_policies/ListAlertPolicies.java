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

// [START monitoring_v3_alertpolicyservice_alertpolicies_list]
import com.google.cloud.monitoring.v3.AlertPolicyServiceClient;
import com.google.monitoring.v3.AlertPolicy;

public class ListAlertPolicies {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listAlertPolicies(projectId);
  }

  public static void listAlertPolicies(String projectId) throws Exception {
    try (AlertPolicyServiceClient client = AlertPolicyServiceClient.create()) {
      String name = "projects/" + projectId;
      for (AlertPolicy alertPolicy : client.listAlertPolicies(name).iterateAll()) {
        System.out.println("Alert policy name: " + alertPolicy.getName());
        System.out.println("Display name: " + alertPolicy.getDisplayName());
      }
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicies_list]
