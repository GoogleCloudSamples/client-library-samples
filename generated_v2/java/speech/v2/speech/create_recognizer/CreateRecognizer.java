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

// [START speech_v2_speech_recognizer_create]
import com.google.cloud.speech.v2.CreateRecognizerRequest;
import com.google.cloud.speech.v2.RecognitionConfig;
import com.google.cloud.speech.v2.Recognizer;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateRecognizer {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "global";
    String recognizerId = "example-recognizer-id";
    createRecognizer(projectId, locationId, recognizerId);
  }

  public static void createRecognizer(String projectId, String locationId, String recognizerId)
      throws IOException, ExecutionException, InterruptedException {
    SpeechSettings.Builder speechSettings = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettings.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }

    try (SpeechClient client = SpeechClient.create(speechSettings.build())) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      RecognitionConfig recognitionConfig =
          RecognitionConfig.newBuilder()
              .setModel("latest_long")
              .addLanguageCodes("en-US")
              .build();

      Recognizer recognizer =
          Recognizer.newBuilder()
              .setDisplayName("Example Recognizer")
              .setDefaultRecognitionConfig(recognitionConfig)
              .build();

      CreateRecognizerRequest request =
          CreateRecognizerRequest.newBuilder()
              .setParent(parent)
              .setRecognizerId(recognizerId)
              .setRecognizer(recognizer)
              .build();

      // Wait for the long-running operation to complete.
      Recognizer response = client.createRecognizerAsync(request).get();
      System.out.println("Created recognizer: " + response.getName());
    }
  }
}
// [END speech_v2_speech_recognizer_create]
