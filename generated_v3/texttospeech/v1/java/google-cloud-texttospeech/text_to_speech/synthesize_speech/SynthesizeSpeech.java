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

// [START texttospeech_v1_texttospeech_synthesize_speech]
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;

public class SynthesizeSpeech {

  public static void main(String[] args) throws Exception {
    synthesizeSpeech();
  }

  public static void synthesizeSpeech() throws Exception {
    try (TextToSpeechClient client = TextToSpeechClient.create()) {
      SynthesisInput input = SynthesisInput.newBuilder()
          .setText("Hello, world!")
          .build();

      VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
          .setLanguageCode("en-US")
          .setSsmlGender(SsmlVoiceGender.FEMALE)
          .build();

      AudioConfig audioConfig = AudioConfig.newBuilder()
          .setAudioEncoding(AudioEncoding.MP3)
          .build();

      SynthesizeSpeechResponse response = client.synthesizeSpeech(input, voice, audioConfig);
      System.out.printf("Audio content synthesized: %d bytes%n", response.getAudioContent().size());
    }
  }
}
// [END texttospeech_v1_texttospeech_synthesize_speech]
