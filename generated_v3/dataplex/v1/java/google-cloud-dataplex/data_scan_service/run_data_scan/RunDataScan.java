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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_datascanservice_run_data_scan]
import com.google.cloud.dataplex.v1.DataScanName;
import com.google.cloud.dataplex.v1.DataScanServiceClient;
import com.google.cloud.dataplex.v1.RunDataScanResponse;
import java.io.IOException;

public class RunDataScan {

  public static void runDataScan(String projectId, String locationId, String dataScanId)
      throws IOException {
    try (DataScanServiceClient client = DataScanServiceClient.create()) {
      String name = DataScanName.of(projectId, locationId, dataScanId).toString();
      RunDataScanResponse response = client.runDataScan(name);

      System.out.println("Data scan job name: " + response.getJob().getName());
      System.out.println("Data scan job state: " + response.getJob().getState());
    }
  }
}
// [END dataplex_v1_datascanservice_run_data_scan]
