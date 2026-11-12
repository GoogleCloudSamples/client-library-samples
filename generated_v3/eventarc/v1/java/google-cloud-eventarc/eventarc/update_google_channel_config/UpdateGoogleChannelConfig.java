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

// [START eventarc_v1_eventarc_googlechannelconfig_update]
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.GoogleChannelConfig;
import com.google.protobuf.FieldMask;

public class UpdateGoogleChannelConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    updateGoogleChannelConfig(projectId, locationId);
  }

  public static void updateGoogleChannelConfig(String projectId, String locationId)
      throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      // Configure customer-managed encryption key (CMEK) settings for the Google channel
      GoogleChannelConfig googleChannelConfig =
          GoogleChannelConfig.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/googleChannelConfig", projectId, locationId))
              .setCryptoKeyName(
                  String.format(
                      "projects/%s/locations/%s/keyRings/example-keyring/cryptoKeys/example-key",
                      projectId, locationId))
              .build();

      // Specify the fields to update (GoogleChannelConfig manages crypto_key_name; labels are unsupported)
      FieldMask updateMask = FieldMask.newBuilder().addPaths("crypto_key_name").build();

      GoogleChannelConfig response =
          client.updateGoogleChannelConfig(googleChannelConfig, updateMask);
      System.out.println("Updated Google channel config: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_googlechannelconfig_update]
