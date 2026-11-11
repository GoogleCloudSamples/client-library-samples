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

// [START migrationcenter_v1_migrationcenter_preferenceset_create]
import com.google.cloud.migrationcenter.v1.LocationName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.PreferenceSet;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreatePreferenceSet {

  public static void main(String[] args) throws Exception {
    String preferenceSetId = "example-preference-set-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createPreferenceSet(preferenceSetId, projectId, locationId);
  }

  public static void createPreferenceSet(String preferenceSetId, String projectId, String locationId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      PreferenceSet preferenceSet =
          PreferenceSet.newBuilder()
              .setDisplayName("Example Preference Set")
              .setDescription("Description for example preference set")
              .build();

      // Wait for the long-running operation to complete
      PreferenceSet response =
          client.createPreferenceSetAsync(parent, preferenceSet, preferenceSetId).get(5, TimeUnit.MINUTES);

      System.out.println("Created preference set: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_preferenceset_create]
