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

// [START migrationcenter_v1_migrationcenter_source_create]
import com.google.cloud.migrationcenter.v1.LocationName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.Source;

public class CreateSource {

  public static void main(String[] args) throws Exception {
    String sourceId = "example-source-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createSource(sourceId, projectId, locationId);
  }

  public static void createSource(String sourceId, String projectId, String locationId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Source source =
          Source.newBuilder()
              .setDisplayName("Sample Upload Source")
              .setType(Source.SourceType.SOURCE_TYPE_UPLOAD)
              .build();

      Source response = client.createSourceAsync(parent, source, sourceId).get();
      System.out.println("Created source: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_source_create]
