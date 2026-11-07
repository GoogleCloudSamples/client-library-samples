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

// [START speech_v2_speech_customclass_get]
import com.google.cloud.speech.v2.CustomClass;
import com.google.cloud.speech.v2.CustomClassName;
import com.google.cloud.speech.v2.GetCustomClassRequest;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import java.io.IOException;

public class GetCustomClass {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String customClassId = "example-custom-class-id";
    getCustomClass(projectId, locationId, customClassId);
  }

  public static void getCustomClass(String projectId, String locationId, String customClassId)
      throws IOException {
    SpeechSettings.Builder speechSettingsBuilder = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettingsBuilder.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }
    SpeechSettings speechSettings = speechSettingsBuilder.build();

    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (SpeechClient client = SpeechClient.create(speechSettings)) {
      String name = CustomClassName.of(projectId, locationId, customClassId).toString();
      GetCustomClassRequest request = GetCustomClassRequest.newBuilder().setName(name).build();

      CustomClass response = client.getCustomClass(request);
      System.out.println("Custom Class name: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("Items count: " + response.getItemsCount());
    }
  }
}
// [END speech_v2_speech_customclass_get]
