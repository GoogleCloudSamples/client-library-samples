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

// [START dataplex_v1_datascanservice_datascans_list]
import com.google.cloud.dataplex.v1.DataScan;
import com.google.cloud.dataplex.v1.DataScanServiceClient;

public class ListDataScans {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listDataScans(projectId, locationId);
  }

  public static void listDataScans(String projectId, String locationId) throws Exception {
    try (DataScanServiceClient client = DataScanServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (DataScan dataScan : client.listDataScans(parent).iterateAll()) {
        System.out.println("Data scan name: " + dataScan.getName());
        System.out.println("Data scan type: " + dataScan.getType());
        System.out.println("Data scan state: " + dataScan.getState());
      }
    }
  }
}
// [END dataplex_v1_datascanservice_datascans_list]
