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

// [START speech_v2_speech_config_get]
import com.google.cloud.speech.v2.Config;
import com.google.cloud.speech.v2.GetConfigRequest;
import com.google.cloud.speech.v2.SpeechClient;

public class GetConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    getConfig(projectId, locationId);
  }

  public static void getConfig(String projectId, String locationId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (SpeechClient client = SpeechClient.create()) {
      String name = String.format("projects/%s/locations/%s/config", projectId, locationId);

      GetConfigRequest request = GetConfigRequest.newBuilder().setName(name).build();

      Config response = client.getConfig(request);
      System.out.println("Config name: " + response.getName());
      System.out.println("KMS key name: " + response.getKmsKeyName());
    }
  }
}
// [END speech_v2_speech_config_get]
