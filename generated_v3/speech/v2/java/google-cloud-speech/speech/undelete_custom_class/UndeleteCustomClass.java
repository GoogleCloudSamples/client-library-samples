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

// [START speech_v2_speech_undelete_custom_class]
import com.google.cloud.speech.v2.CustomClass;
import com.google.cloud.speech.v2.CustomClassName;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import com.google.cloud.speech.v2.UndeleteCustomClassRequest;

public class UndeleteCustomClass {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String customClassId = "example-custom-class-id";
    undeleteCustomClass(projectId, locationId, customClassId);
  }

  public static void undeleteCustomClass(String projectId, String locationId, String customClassId)
      throws Exception {
    SpeechSettings.Builder speechSettingsBuilder = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettingsBuilder.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }
    SpeechSettings speechSettings = speechSettingsBuilder.build();

    try (SpeechClient client = SpeechClient.create(speechSettings)) {
      String name = CustomClassName.of(projectId, locationId, customClassId).toString();

      UndeleteCustomClassRequest request =
          UndeleteCustomClassRequest.newBuilder().setName(name).build();

      // UndeleteCustomClass returns a long-running operation.
      CustomClass response = client.undeleteCustomClassAsync(request).get();
      System.out.println("Undeleted CustomClass: " + response.getName());
    }
  }
}
// [END speech_v2_speech_undelete_custom_class]
