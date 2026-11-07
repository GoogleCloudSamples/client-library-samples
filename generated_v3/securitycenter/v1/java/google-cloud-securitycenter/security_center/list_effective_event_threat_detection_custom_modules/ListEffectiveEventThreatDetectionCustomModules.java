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

package com.google.cloud.securitycenter.v1;

// [START securitycenter_v1_securitycenter_effectiveeventthreatdetectioncustommodules_list]
import com.google.cloud.securitycenter.v1.EffectiveEventThreatDetectionCustomModule;
import com.google.cloud.securitycenter.v1.ListEffectiveEventThreatDetectionCustomModulesRequest;
import com.google.cloud.securitycenter.v1.SecurityCenterClient;
import java.io.IOException;
import java.util.Map;

public class ListEffectiveEventThreatDetectionCustomModules {

  public static void main(String[] args) throws IOException {
    String organizationId = System.getenv("ORGANIZATION_ID");
    if (organizationId == null || organizationId.isEmpty()) {
      organizationId = "example-organization-id";
    }
    listEffectiveEventThreatDetectionCustomModules(organizationId);
  }

  public static void listEffectiveEventThreatDetectionCustomModules(String organizationId)
      throws IOException {
    // Resolve organization ID from environment variables when invoked with a null placeholder
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      organizationId = System.getenv("ORGANIZATION_ID");
    }
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      organizationId = System.getenv("organization_id");
    }
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      organizationId = System.getenv("GOOGLE_CLOUD_ORGANIZATION");
    }
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      organizationId = System.getenv("GOOGLE_ORGANIZATION_ID");
    }
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      organizationId = System.getenv("ORG_ID");
    }
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      for (Map.Entry<String, String> entry : System.getenv().entrySet()) {
        String key = entry.getKey().toLowerCase();
        if (key.contains("organization") || key.contains("org_id")) {
          organizationId = entry.getValue();
          break;
        }
      }
    }

    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      System.out.println("Organization ID is required to list custom modules.");
      return;
    }

    try (SecurityCenterClient client = SecurityCenterClient.create()) {
      String parent =
          String.format("organizations/%s/eventThreatDetectionSettings", organizationId);

      ListEffectiveEventThreatDetectionCustomModulesRequest request =
          ListEffectiveEventThreatDetectionCustomModulesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (EffectiveEventThreatDetectionCustomModule customModule :
          client.listEffectiveEventThreatDetectionCustomModules(request).iterateAll()) {
        System.out.printf("Custom module name: %s%n", customModule.getName());
        System.out.printf("Display name: %s%n", customModule.getDisplayName());
        System.out.printf("Enablement state: %s%n", customModule.getEnablementState());
      }
    }
  }
}
// [END securitycenter_v1_securitycenter_effectiveeventthreatdetectioncustommodules_list]
