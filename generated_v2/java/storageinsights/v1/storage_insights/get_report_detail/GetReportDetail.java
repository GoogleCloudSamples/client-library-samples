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

package com.google.cloud.storageinsights.v1;

// [START storageinsights_v1_storageinsights_reportdetail_get]
import com.google.cloud.storageinsights.v1.ReportDetail;
import com.google.cloud.storageinsights.v1.ReportDetailName;
import com.google.cloud.storageinsights.v1.StorageInsightsClient;
import java.io.IOException;

public class GetReportDetail {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String reportConfigId = "example-report-config-id";
    String reportDetailId = "example-report-detail-id";
    getReportDetail(projectId, locationId, reportConfigId, reportDetailId);
  }

  public static void getReportDetail(
      String projectId, String locationId, String reportConfigId, String reportDetailId)
      throws IOException {
    try (StorageInsightsClient client = StorageInsightsClient.create()) {
      String name =
          ReportDetailName.format(projectId, locationId, reportConfigId, reportDetailId);

      ReportDetail reportDetail = client.getReportDetail(name);

      System.out.println("Report detail name: " + reportDetail.getName());
    }
  }
}
// [END storageinsights_v1_storageinsights_reportdetail_get]
