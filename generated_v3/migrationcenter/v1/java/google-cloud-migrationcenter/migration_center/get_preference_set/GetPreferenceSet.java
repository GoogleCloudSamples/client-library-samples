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

// [START migrationcenter_v1_migrationcenter_preferenceset_get]
import com.google.cloud.migrationcenter.v1.GetPreferenceSetRequest;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.PreferenceSet;
import com.google.cloud.migrationcenter.v1.PreferenceSetName;

public class GetPreferenceSet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String preferenceSetId = "example-preference-set-id";
    getPreferenceSet(projectId, locationId, preferenceSetId);
  }

  public static void getPreferenceSet(String projectId, String locationId, String preferenceSetId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name = PreferenceSetName.of(projectId, locationId, preferenceSetId).toString();
      GetPreferenceSetRequest request = GetPreferenceSetRequest.newBuilder().setName(name).build();

      PreferenceSet response = client.getPreferenceSet(request);
      System.out.println("Retrieved preference set: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_preferenceset_get]
