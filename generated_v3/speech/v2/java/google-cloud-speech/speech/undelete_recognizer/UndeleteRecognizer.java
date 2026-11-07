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

// [START speech_v2_speech_undelete_recognizer]
import com.google.cloud.speech.v2.Recognizer;
import com.google.cloud.speech.v2.RecognizerName;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import com.google.cloud.speech.v2.UndeleteRecognizerRequest;

public class UndeleteRecognizer {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String recognizerId = "example-recognizer-id";
    undeleteRecognizer(projectId, locationId, recognizerId);
  }

  public static void undeleteRecognizer(
      String projectId, String locationId, String recognizerId) throws Exception {
    SpeechSettings.Builder speechSettingsBuilder = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettingsBuilder.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }
    SpeechSettings speechSettings = speechSettingsBuilder.build();

    try (SpeechClient client = SpeechClient.create(speechSettings)) {
      String name = RecognizerName.of(projectId, locationId, recognizerId).toString();
      UndeleteRecognizerRequest request =
          UndeleteRecognizerRequest.newBuilder()
              .setName(name)
              .build();

      // UndeleteRecognizer is a long-running operation; wait for it to complete.
      Recognizer response = client.undeleteRecognizerAsync(request).get();
      System.out.println("Undeleted recognizer: " + response.getName());
    }
  }
}
// [END speech_v2_speech_undelete_recognizer]
