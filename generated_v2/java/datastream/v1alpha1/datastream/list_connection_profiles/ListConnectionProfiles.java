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

package com.google.cloud.datastream.v1alpha1;

// [START datastream_v1alpha1_datastream_connectionprofiles_list]
import com.google.cloud.datastream.v1alpha1.ConnectionProfile;
import com.google.cloud.datastream.v1alpha1.DatastreamClient;
import com.google.cloud.datastream.v1alpha1.LocationName;

public class ListConnectionProfiles {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listConnectionProfiles(projectId, locationId);
  }

  public static void listConnectionProfiles(String projectId, String locationId) throws Exception {
    try (DatastreamClient client = DatastreamClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (ConnectionProfile connectionProfile : client.listConnectionProfiles(parent).iterateAll()) {
        System.out.println("Connection profile: " + connectionProfile.getName());
      }
    }
  }
}
// [END datastream_v1alpha1_datastream_connectionprofiles_list]
