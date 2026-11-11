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

// [START migrationcenter_v1_migrationcenter_preferenceset_delete]
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.PreferenceSetName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeletePreferenceSet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String preferenceSetId = "example-preference-set-id";
    deletePreferenceSet(projectId, locationId, preferenceSetId);
  }

  public static void deletePreferenceSet(
      String projectId, String locationId, String preferenceSetId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name = PreferenceSetName.of(projectId, locationId, preferenceSetId).toString();

      // DeletePreferenceSet is a long-running operation; wait for operation completion.
      client.deletePreferenceSetAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted preference set: " + name);
    }
  }
}
// [END migrationcenter_v1_migrationcenter_preferenceset_delete]
