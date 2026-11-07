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

package com.google.cloud.migrationcenter.v1;

// [START migrationcenter_v1_migrationcenter_reportconfig_create]
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.ReportConfig;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateReportConfig {

  public static void main(String[] args) throws Exception {
    String reportConfigId = "example-report-config-id";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String groupId = "example-group-id";
    String preferenceSetId = "example-preference-set-id";
    createReportConfig(reportConfigId, projectId, locationId, groupId, preferenceSetId);
  }

  public static void createReportConfig(
      String reportConfigId,
      String projectId,
      String locationId,
      String groupId,
      String preferenceSetId)
      throws IOException, ExecutionException, InterruptedException {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String groupPath =
          String.format("projects/%s/locations/%s/groups/%s", projectId, locationId, groupId);
      String preferenceSetPath =
          String.format(
              "projects/%s/locations/%s/preferenceSets/%s",
              projectId, locationId, preferenceSetId);

      ReportConfig reportConfig =
          ReportConfig.newBuilder()
              .setDisplayName("Example Report Config")
              .setDescription("Report configuration for migration assessment")
              .addGroupPreferencesetAssignments(
                  ReportConfig.GroupPreferenceSetAssignment.newBuilder()
                      .setGroup(groupPath)
                      .setPreferenceSet(preferenceSetPath)
                      .build())
              .build();

      // Initiate the long-running operation and wait for completion
      ReportConfig response =
          client.createReportConfigAsync(parent, reportConfig, reportConfigId).get();

      System.out.println("Created report config: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_reportconfig_create]
