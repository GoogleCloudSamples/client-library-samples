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

// [START speech_v1p1beta1_adaptation_phraseset_create]
import com.google.cloud.speech.v1p1beta1.AdaptationClient;
import com.google.cloud.speech.v1p1beta1.LocationName;
import com.google.cloud.speech.v1p1beta1.PhraseSet;
import java.io.IOException;

public class CreatePhraseSet {

  public static void createPhraseSet(String projectId, String locationId, String phraseSetId)
      throws IOException {
    try (AdaptationClient client = AdaptationClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      PhraseSet phraseSet =
          PhraseSet.newBuilder()
              .addPhrases(
                  PhraseSet.Phrase.newBuilder()
                      .setValue("fairway")
                      .setBoost(10.0f)
                      .build())
              .build();

      PhraseSet response = client.createPhraseSet(parent, phraseSet, phraseSetId);
      System.out.println("Created PhraseSet: " + response.getName());
    }
  }
}
// [END speech_v1p1beta1_adaptation_phraseset_create]
