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

package com.google.cloud.contactcenterinsights.v1;

// [START contactcenterinsights_v1_contactcenterinsights_phrasematcher_get]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.PhraseMatcher;
import com.google.cloud.contactcenterinsights.v1.PhraseMatcherName;

public class GetPhraseMatcher {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String phraseMatcherId = "example-phrase_matcher_id";
    getPhraseMatcher(projectId, locationId, phraseMatcherId);
  }

  public static void getPhraseMatcher(String projectId, String locationId, String phraseMatcherId)
      throws Exception {
    // Initialize the client that will be used to send requests.
    // The client can be reused for multiple requests and must be closed after use.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String name = PhraseMatcherName.of(projectId, locationId, phraseMatcherId).toString();
      PhraseMatcher phraseMatcher = client.getPhraseMatcher(name);
      System.out.println("Retrieved phrase matcher: " + phraseMatcher.getName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_phrasematcher_get]
