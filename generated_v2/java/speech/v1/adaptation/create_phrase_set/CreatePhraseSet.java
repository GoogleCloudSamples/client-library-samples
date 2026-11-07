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

package com.google.cloud.speech.v1;

// [START speech_v1_adaptation_phraseset_create]
import com.google.cloud.speech.v1.AdaptationClient;
import com.google.cloud.speech.v1.PhraseSet;

public class CreatePhraseSet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String phraseSetId = "example-phrase_set_id";
    createPhraseSet(projectId, locationId, phraseSetId);
  }

  public static void createPhraseSet(String projectId, String locationId, String phraseSetId)
      throws Exception {
    try (AdaptationClient client = AdaptationClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      PhraseSet phraseSet =
          PhraseSet.newBuilder()
              .addPhrases(
                  PhraseSet.Phrase.newBuilder().setValue("example phrase").setBoost(10.0f).build())
              .setBoost(15.0f)
              .build();

      PhraseSet response = client.createPhraseSet(parent, phraseSet, phraseSetId);
      System.out.println("Created phrase set: " + response.getName());
    }
  }
}
// [END speech_v1_adaptation_phraseset_create]
