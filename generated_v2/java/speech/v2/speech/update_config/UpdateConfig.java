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

package com.google.cloud.speech.v2;

// [START speech_v2_speech_config_update]
import com.google.cloud.speech.v2.Config;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import com.google.cloud.speech.v2.UpdateConfigRequest;
import com.google.protobuf.FieldMask;

public class UpdateConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    updateConfig(projectId, locationId);
  }

  public static void updateConfig(String projectId, String locationId) throws Exception {
    String endpoint =
        "global".equals(locationId)
            ? "speech.googleapis.com:443"
            : String.format("%s-speech.googleapis.com:443", locationId);

    SpeechSettings settings = SpeechSettings.newBuilder().setEndpoint(endpoint).build();

    try (SpeechClient client = SpeechClient.create(settings)) {
      Config config =
          Config.newBuilder()
              .setName(String.format("projects/%s/locations/%s/config", projectId, locationId))
              .setKmsKeyName(
                  String.format(
                      "projects/%s/locations/%s/keyRings/example-keyring/cryptoKeys/example-key",
                      projectId, locationId))
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("kms_key_name").build();

      UpdateConfigRequest request =
          UpdateConfigRequest.newBuilder().setConfig(config).setUpdateMask(updateMask).build();

      Config response = client.updateConfig(request);
      System.out.println("Updated config: " + response.getName());
    }
  }
}
// [END speech_v2_speech_config_update]
