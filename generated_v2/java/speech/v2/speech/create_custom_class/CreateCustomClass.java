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

// [START speech_v2_speech_customclass_create]
import com.google.cloud.speech.v2.CreateCustomClassRequest;
import com.google.cloud.speech.v2.CustomClass;
import com.google.cloud.speech.v2.LocationName;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;

public class CreateCustomClass {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String customClassId = "example-custom-class-id";
    createCustomClass(projectId, locationId, customClassId);
  }

  public static void createCustomClass(String projectId, String locationId, String customClassId)
      throws Exception {
    SpeechSettings.Builder speechSettingsBuilder = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettingsBuilder.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }
    SpeechSettings speechSettings = speechSettingsBuilder.build();

    try (SpeechClient client = SpeechClient.create(speechSettings)) {
      String parent = LocationName.of(projectId, locationId).toString();
      CustomClass customClass =
          CustomClass.newBuilder()
              .setDisplayName("Example Display Name")
              .addItems(CustomClass.ClassItem.newBuilder().setValue("example-phrase").build())
              .build();

      CreateCustomClassRequest request =
          CreateCustomClassRequest.newBuilder()
              .setParent(parent)
              .setCustomClassId(customClassId)
              .setCustomClass(customClass)
              .build();

      // CreateCustomClass is a long-running operation; wait for it to complete.
      CustomClass response = client.createCustomClassAsync(request).get();
      System.out.println("Created CustomClass: " + response.getName());
    }
  }
}
// [END speech_v2_speech_customclass_create]
