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

package com.google.cloud.eventarc.v1;

// [START eventarc_v1_eventarc_googlechannelconfig_get]
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.GoogleChannelConfig;
import com.google.cloud.eventarc.v1.GoogleChannelConfigName;

public class GetGoogleChannelConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    getGoogleChannelConfig(projectId, locationId);
  }

  public static void getGoogleChannelConfig(String projectId, String locationId) throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String name = GoogleChannelConfigName.of(projectId, locationId).toString();
      GoogleChannelConfig response = client.getGoogleChannelConfig(name);
      System.out.println("Retrieved GoogleChannelConfig: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_googlechannelconfig_get]
