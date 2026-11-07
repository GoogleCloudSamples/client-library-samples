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

// [START speech_v2_speech_customclasses_list]
import com.google.cloud.speech.v2.CustomClass;
import com.google.cloud.speech.v2.ListCustomClassesRequest;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import java.io.IOException;

public class ListCustomClasses {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listCustomClasses(projectId, locationId);
  }

  public static void listCustomClasses(String projectId, String locationId) throws IOException {
    SpeechSettings.Builder speechSettingsBuilder = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettingsBuilder.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }
    SpeechSettings speechSettings = speechSettingsBuilder.build();

    try (SpeechClient client = SpeechClient.create(speechSettings)) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListCustomClassesRequest request =
          ListCustomClassesRequest.newBuilder().setParent(parent).build();

      for (CustomClass customClass : client.listCustomClasses(request).iterateAll()) {
        System.out.printf("Custom class name: %s%n", customClass.getName());
        System.out.printf("Display name: %s%n", customClass.getDisplayName());
      }
    }
  }
}
// [END speech_v2_speech_customclasses_list]
