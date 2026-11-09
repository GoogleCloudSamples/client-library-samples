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

package com.google.cloud.texttospeech.v1;

// [START texttospeech_v1_texttospeech_voices_list]
import com.google.cloud.texttospeech.v1.ListVoicesRequest;
import com.google.cloud.texttospeech.v1.ListVoicesResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.Voice;

public class ListVoices {

  public static void main(String[] args) throws Exception {
    String languageCode = "en-US";
    listVoices(languageCode);
  }

  public static void listVoices(String languageCode) throws Exception {
    try (TextToSpeechClient client = TextToSpeechClient.create()) {
      ListVoicesRequest request =
          ListVoicesRequest.newBuilder().setLanguageCode(languageCode).build();
      ListVoicesResponse response = client.listVoices(request);

      for (Voice voice : response.getVoicesList()) {
        System.out.printf("Name: %s%n", voice.getName());
        System.out.printf("SSML voice gender: %s%n", voice.getSsmlGender());
        System.out.printf("Natural sample rate hertz: %d%n", voice.getNaturalSampleRateHertz());
        System.out.printf("Supported language codes: %s%n%n", voice.getLanguageCodesList());
      }
    }
  }
}
// [END texttospeech_v1_texttospeech_voices_list]
