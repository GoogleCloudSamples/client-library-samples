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

// [START migrationcenter_v1_migrationcenter_reports_list]
import com.google.cloud.migrationcenter.v1.ListReportsRequest;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.Report;
import com.google.cloud.migrationcenter.v1.ReportConfigName;

public class ListReports {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String reportConfigId = "example-report-config-id";
    listReports(projectId, locationId, reportConfigId);
  }

  public static void listReports(String projectId, String locationId, String reportConfigId)
      throws Exception {
    // Initialize client that will be automatically closed at the end of the block.
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = ReportConfigName.of(projectId, locationId, reportConfigId).toString();

      ListReportsRequest request = ListReportsRequest.newBuilder()
          .setParent(parent)
          .build();

      for (Report report : client.listReports(request).iterateAll()) {
        System.out.println("Report: " + report.getName());
      }
    }
  }
}
// [END migrationcenter_v1_migrationcenter_reports_list]
