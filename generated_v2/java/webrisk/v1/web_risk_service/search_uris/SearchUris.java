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

package com.google.cloud.webrisk.v1;

// [START webrisk_v1_webriskservice_uris_search]
import com.google.cloud.webrisk.v1.WebRiskServiceClient;
import com.google.cloud.webrisk.v1.WebRiskServiceSettings;
import com.google.webrisk.v1.SearchUrisRequest;
import com.google.webrisk.v1.SearchUrisResponse;
import com.google.webrisk.v1.ThreatType;
import java.io.IOException;

public class SearchUris {

  public static void main(String[] args) throws IOException {
    searchUris();
  }

  public static void searchUris() throws IOException {
    String uri = "https://example.com";
    ThreatType threatTypes = ThreatType.MALWARE;

    WebRiskServiceSettings.Builder settingsBuilder = WebRiskServiceSettings.newBuilder();
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("PROJECT_ID");
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("GCLOUD_PROJECT");
    }
    if (projectId != null && !projectId.isEmpty()) {
      settingsBuilder.setQuotaProjectId(projectId);
    }

    try (WebRiskServiceClient client = WebRiskServiceClient.create(settingsBuilder.build())) {
      SearchUrisRequest request =
          SearchUrisRequest.newBuilder()
              .setUri(uri)
              .addThreatTypes(threatTypes)
              .build();

      SearchUrisResponse response = client.searchUris(request);

      if (response.hasThreat()) {
        System.out.println("Threat detected: " + response.getThreat().getThreatTypesList());
      } else {
        System.out.println("No threat detected for URI: " + uri);
      }
    }
  }
}
// [END webrisk_v1_webriskservice_uris_search]
