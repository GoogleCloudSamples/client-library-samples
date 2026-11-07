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

// [START speech_v2_speech_phrasesets_list]
import com.google.cloud.speech.v2.ListPhraseSetsRequest;
import com.google.cloud.speech.v2.PhraseSet;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import java.io.IOException;

public class ListPhraseSets {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listPhraseSets(projectId, locationId);
  }

  public static void listPhraseSets(String projectId, String locationId) throws IOException {
    SpeechSettings.Builder speechSettings = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      speechSettings.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }

    try (SpeechClient client = SpeechClient.create(speechSettings.build())) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListPhraseSetsRequest request =
          ListPhraseSetsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (PhraseSet phraseSet : client.listPhraseSets(request).iterateAll()) {
        System.out.printf("Phrase set name: %s%n", phraseSet.getName());
      }
    }
  }
}
// [END speech_v2_speech_phrasesets_list]
