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

package com.google.cloud.speech.v1p1beta1;

// [START speech_v1p1beta1_speech_recognize]
import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
import com.google.cloud.speech.v1p1beta1.SpeechSettings;
import java.io.IOException;

public class Recognize {

  public static void main(String[] args) throws IOException {
    recognize();
  }

  public static void recognize() throws IOException {
    SpeechSettings.Builder settingsBuilder = SpeechSettings.newBuilder();
    String projectId = System.getProperty("projectId");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("GCP_PROJECT");
    }
    if (projectId != null && !projectId.isEmpty()) {
      settingsBuilder.setQuotaProjectId(projectId);
    }

    try (SpeechClient client = SpeechClient.create(settingsBuilder.build())) {
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
              .setSampleRateHertz(16000)
              .setLanguageCode("en-US")
              .build();

      RecognitionAudio audio =
          RecognitionAudio.newBuilder()
              .setUri("gs://cloud-samples-data/speech/brooklyn_bridge.raw")
              .build();

      RecognizeResponse response = client.recognize(config, audio);

      for (SpeechRecognitionResult result : response.getResultsList()) {
        for (SpeechRecognitionAlternative alternative : result.getAlternativesList()) {
          System.out.printf(
              "Transcription: %s (confidence: %.2f)%n",
              alternative.getTranscript(), alternative.getConfidence());
        }
      }
    }
  }
}
// [END speech_v1p1beta1_speech_recognize]
