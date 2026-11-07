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

// [START speech_v2_speech_phraseset_delete]
import com.google.cloud.speech.v2.PhraseSet;
import com.google.cloud.speech.v2.PhraseSetName;
import com.google.cloud.speech.v2.SpeechClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeletePhraseSet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String phraseSetId = "example-phrase_set_id";
    deletePhraseSet(projectId, locationId, phraseSetId);
  }

  public static void deletePhraseSet(String projectId, String locationId, String phraseSetId)
      throws Exception {
    try (SpeechClient client = SpeechClient.create()) {
      String name = PhraseSetName.of(projectId, locationId, phraseSetId).toString();

      // Wait for the long-running delete operation to complete.
      PhraseSet response = client.deletePhraseSetAsync(name).get(3, TimeUnit.MINUTES);
      System.out.println("Deleted PhraseSet: " + response.getName());
    }
  }
}
// [END speech_v2_speech_phraseset_delete]
