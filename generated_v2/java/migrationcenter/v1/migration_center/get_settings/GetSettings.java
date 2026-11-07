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

// [START migrationcenter_v1_migrationcenter_settings_get]
import com.google.cloud.migrationcenter.v1.GetSettingsRequest;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.Settings;

public class GetSettings {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    getSettings(projectId, locationId);
  }

  public static void getSettings(String projectId, String locationId) throws Exception {
    // Initialize the client that interacts with the Migration Center API.
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name = String.format("projects/%s/locations/%s/settings", projectId, locationId);
      GetSettingsRequest request = GetSettingsRequest.newBuilder().setName(name).build();
      Settings response = client.getSettings(request);

      System.out.println("Settings name: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_settings_get]
