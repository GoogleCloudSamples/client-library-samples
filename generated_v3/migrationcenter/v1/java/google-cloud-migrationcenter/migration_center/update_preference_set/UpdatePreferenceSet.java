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

// [START migrationcenter_v1_migrationcenter_preferenceset_update]
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.PreferenceSet;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdatePreferenceSet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String preferenceSetId = "example-preference_set_id";
    updatePreferenceSet(projectId, locationId, preferenceSetId);
  }

  public static void updatePreferenceSet(
      String projectId, String locationId, String preferenceSetId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      PreferenceSet preferenceSet =
          PreferenceSet.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/preferenceSets/%s",
                      projectId, locationId, preferenceSetId))
              .setDescription("Updated preference set description")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Initiate the update operation and wait for completion.
      PreferenceSet response =
          client.updatePreferenceSetAsync(preferenceSet, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated preference set: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_preferenceset_update]
