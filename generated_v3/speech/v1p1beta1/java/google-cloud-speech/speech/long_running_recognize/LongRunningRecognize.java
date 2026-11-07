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

// [START speech_v1p1beta1_speech_long_running_recognize]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.speech.v1p1beta1.LongRunningRecognizeMetadata;
import com.google.cloud.speech.v1p1beta1.LongRunningRecognizeResponse;
import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class LongRunningRecognize {

  public static void main(String[] args) throws Exception {
    longRunningRecognize();
  }

  public static void longRunningRecognize() throws Exception {
    try (SpeechClient client = SpeechClient.create()) {
      RecognitionConfig config =
          RecognitionConfig.newBuilder()
              .setEncoding(AudioEncoding.LINEAR16)
              .setSampleRateHertz(16000)
              .setLanguageCode("en-US")
              .build();
      RecognitionAudio audio =
          RecognitionAudio.newBuilder()
              .setUri("gs://cloud-samples-data/speech/brooklyn_bridge.raw")
              .build();

      OperationFuture<LongRunningRecognizeResponse, LongRunningRecognizeMetadata> future =
          client.longRunningRecognizeAsync(config, audio);

      LongRunningRecognizeResponse response = future.get(300, TimeUnit.SECONDS);
      for (SpeechRecognitionResult result : response.getResultsList()) {
        for (SpeechRecognitionAlternative alternative : result.getAlternativesList()) {
          System.out.printf("Transcription: %s%n", alternative.getTranscript());
        }
      }
    }
  }
}
// [END speech_v1p1beta1_speech_long_running_recognize]
