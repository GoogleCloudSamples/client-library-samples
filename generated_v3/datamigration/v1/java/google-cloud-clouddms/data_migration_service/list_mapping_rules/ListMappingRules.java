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

package com.google.cloud.datamigration.v1;

// [START datamigration_v1_datamigrationservice_mappingrules_list]
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.ListMappingRulesRequest;
import com.google.cloud.clouddms.v1.MappingRule;
import java.io.IOException;

public class ListMappingRules {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String conversionWorkspaceId = "example-conversion-workspace-id";
    listMappingRules(projectId, locationId, conversionWorkspaceId);
  }

  public static void listMappingRules(
      String projectId, String locationId, String conversionWorkspaceId) throws IOException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/conversionWorkspaces/%s",
              projectId, locationId, conversionWorkspaceId);

      ListMappingRulesRequest request =
          ListMappingRulesRequest.newBuilder().setParent(parent).build();

      for (MappingRule mappingRule : client.listMappingRules(request).iterateAll()) {
        System.out.println("Mapping rule: " + mappingRule.getName());
        System.out.println("Display name: " + mappingRule.getDisplayName());
        System.out.println("Rule order: " + mappingRule.getRuleOrder());
        System.out.println("State: " + mappingRule.getState());
      }
    }
  }
}
// [END datamigration_v1_datamigrationservice_mappingrules_list]
