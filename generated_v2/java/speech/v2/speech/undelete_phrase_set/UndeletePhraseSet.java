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

// [START speech_v2_speech_undelete_phrase_set]
import com.google.cloud.speech.v2.PhraseSet;
import com.google.cloud.speech.v2.PhraseSetName;
import com.google.cloud.speech.v2.SpeechClient;
import com.google.cloud.speech.v2.SpeechSettings;
import com.google.cloud.speech.v2.UndeletePhraseSetRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UndeletePhraseSet {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String phraseSetId = "example-phrase-set-id";
    undeletePhraseSet(projectId, locationId, phraseSetId);
  }

  public static void undeletePhraseSet(String projectId, String locationId, String phraseSetId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    SpeechSettings.Builder settingsBuilder = SpeechSettings.newBuilder();
    if (!"global".equals(locationId)) {
      settingsBuilder.setEndpoint(String.format("%s-speech.googleapis.com:443", locationId));
    }
    SpeechSettings speechSettings = settingsBuilder.build();

    try (SpeechClient client = SpeechClient.create(speechSettings)) {
      String name = PhraseSetName.of(projectId, locationId, phraseSetId).toString();
      UndeletePhraseSetRequest request =
          UndeletePhraseSetRequest.newBuilder().setName(name).build();

      PhraseSet phraseSet = client.undeletePhraseSetAsync(request).get(3, TimeUnit.MINUTES);
      System.out.println("Undeleted PhraseSet: " + phraseSet.getName());
    }
  }
}
// [END speech_v2_speech_undelete_phrase_set]
