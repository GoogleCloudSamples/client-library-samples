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

package com.google.cloud.datafusion.v1;

// [START datafusion_v1_datafusion_availableversions_list]
import com.google.cloud.datafusion.v1.DataFusionClient;
import com.google.cloud.datafusion.v1.LocationName;
import com.google.cloud.datafusion.v1.Version;
import java.io.IOException;

public class ListAvailableVersions {

  public static void listAvailableVersions(String projectId, String locationId) throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataFusionClient client = DataFusionClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (Version version : client.listAvailableVersions(parent).iterateAll()) {
        System.out.printf(
            "Version: %s, Default: %b%n", version.getVersionNumber(), version.getDefaultVersion());
      }
    }
  }
}
// [END datafusion_v1_datafusion_availableversions_list]
