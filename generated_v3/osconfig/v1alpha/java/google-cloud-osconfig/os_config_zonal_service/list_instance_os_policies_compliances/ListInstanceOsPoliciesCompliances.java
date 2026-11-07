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

package com.google.cloud.osconfig.v1alpha;

// [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
import com.google.cloud.osconfig.v1alpha.InstanceOSPoliciesCompliance;
import com.google.cloud.osconfig.v1alpha.OsConfigZonalServiceClient;

public class ListInstanceOsPoliciesCompliances {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1-a";
    listInstanceOsPoliciesCompliances(projectId, locationId);
  }

  public static void listInstanceOsPoliciesCompliances(String projectId, String locationId)
      throws Exception {
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (InstanceOSPoliciesCompliance compliance :
          client.listInstanceOSPoliciesCompliances(parent).iterateAll()) {
        System.out.println("Instance OS policies compliance: " + compliance.getName());
      }
    }
  }
}
// [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
