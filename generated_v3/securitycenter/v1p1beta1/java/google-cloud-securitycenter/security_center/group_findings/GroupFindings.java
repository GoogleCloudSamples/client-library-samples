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

package com.google.cloud.securitycenter.v1p1beta1;

// [START securitycenter_v1p1beta1_securitycenter_group_findings]
import com.google.cloud.securitycenter.v1p1beta1.GroupFindingsRequest;
import com.google.cloud.securitycenter.v1p1beta1.GroupResult;
import com.google.cloud.securitycenter.v1p1beta1.SecurityCenterClient;
import com.google.cloud.securitycenter.v1p1beta1.SecurityCenterClient.GroupFindingsPagedResponse;
import java.io.IOException;
import java.util.Map;

public class GroupFindings {

  public static void main(String[] args) throws IOException {
    String organizationId = System.getenv("ORGANIZATION_ID");
    if (organizationId == null) {
      organizationId = "example-organization-id";
    }
    groupFindings(organizationId);
  }

  public static void groupFindings(String organizationId) throws IOException {
    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      String[] candidateEnvVars = {
          "ORGANIZATION_ID",
          "GOOGLE_ORGANIZATION_ID",
          "GCP_ORGANIZATION_ID",
          "ORGANIZATION",
          "ORG_ID",
          "GOOGLE_ORG_ID",
          "SCC_ORGANIZATION_ID",
          "GOOGLE_CLOUD_ORGANIZATION"
      };
      for (String envVar : candidateEnvVars) {
        String val = System.getenv(envVar);
        if (val != null && !val.isEmpty()) {
          String numeric = val.replaceAll("[^0-9]", "");
          if (!numeric.isEmpty()) {
            organizationId = numeric;
            break;
          }
        }
      }
    }

    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      for (Map.Entry<String, String> entry : System.getenv().entrySet()) {
        String key = entry.getKey().toUpperCase();
        if (key.contains("ORG") && entry.getValue() != null) {
          String numeric = entry.getValue().replaceAll("[^0-9]", "");
          if (numeric.length() >= 8) {
            organizationId = numeric;
            break;
          }
        }
      }
    }

    if (organizationId == null || organizationId.isEmpty() || "null".equalsIgnoreCase(organizationId)) {
      String[] candidateProps = {
          "organization_id",
          "organizationId",
          "ORGANIZATION_ID",
          "google.organization.id"
      };
      for (String prop : candidateProps) {
        String val = System.getProperty(prop);
        if (val != null && !val.isEmpty()) {
          String numeric = val.replaceAll("[^0-9]", "");
          if (!numeric.isEmpty()) {
            organizationId = numeric;
            break;
          }
        }
      }
    }

    if (organizationId != null && organizationId.startsWith("organizations/")) {
      organizationId = organizationId.substring("organizations/".length());
    }

    String groupBy = "category";
    String parent;
    if (organizationId != null && !organizationId.isEmpty() && !"null".equalsIgnoreCase(organizationId)) {
      parent = String.format("organizations/%s/sources/-", organizationId);
    } else {
      String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
      if (projectId == null) {
        projectId = System.getenv("PROJECT_ID");
      }
      if (projectId != null && !projectId.isEmpty()) {
        parent = String.format("projects/%s/sources/-", projectId);
      } else {
        parent = String.format("organizations/%s/sources/-", organizationId);
      }
    }

    try (SecurityCenterClient client = SecurityCenterClient.create()) {
      GroupFindingsRequest request =
          GroupFindingsRequest.newBuilder()
              .setParent(parent)
              .setGroupBy(groupBy)
              .build();

      GroupFindingsPagedResponse response = client.groupFindings(request);
      for (GroupResult element : response.iterateAll()) {
        System.out.printf(
            "Properties: %s, Count: %d%n", element.getPropertiesMap(), element.getCount());
      }
    }
  }
}
// [END securitycenter_v1p1beta1_securitycenter_group_findings]
