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

// [START migrationcenter_v1_migrationcenter_sources_list]
import com.google.cloud.migrationcenter.v1.LocationName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.Source;

public class ListSources {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listSources(projectId, locationId);
  }

  public static void listSources(String projectId, String locationId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Source element : client.listSources(parent).iterateAll()) {
        System.out.println("Source: " + element.getName());
      }
    }
  }
}
// [END migrationcenter_v1_migrationcenter_sources_list]
