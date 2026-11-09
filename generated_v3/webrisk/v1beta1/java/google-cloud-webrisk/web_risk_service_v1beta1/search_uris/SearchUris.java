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

package com.google.cloud.webrisk.v1beta1;

// [START webrisk_v1beta1_webriskservicev1beta1_uris_search]
import com.google.cloud.webrisk.v1beta1.WebRiskServiceV1Beta1Client;
import com.google.cloud.webrisk.v1beta1.WebRiskServiceV1Beta1Settings;
import com.google.webrisk.v1beta1.SearchUrisResponse;
import com.google.webrisk.v1beta1.ThreatType;
import java.io.IOException;
import java.util.Collections;

public class SearchUris {

  public static void main(String[] args) throws IOException {
    searchUris();
  }

  public static void searchUris() throws IOException {
    String uri = "https://example.com";
    ThreatType threatTypes = ThreatType.MALWARE;

    // Configure the quota project for billing and API enablement verification.
    WebRiskServiceV1Beta1Settings.Builder settingsBuilder =
        WebRiskServiceV1Beta1Settings.newBuilder();
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("GCLOUD_PROJECT");
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getProperty("google.cloud.project");
    }
    if (projectId != null && !projectId.isEmpty()) {
      settingsBuilder.setQuotaProjectId(projectId);
    }

    try (WebRiskServiceV1Beta1Client client =
        WebRiskServiceV1Beta1Client.create(settingsBuilder.build())) {
      SearchUrisResponse response = client.searchUris(uri, Collections.singletonList(threatTypes));
      if (response.hasThreat()) {
        System.out.println("Threat detected: " + response.getThreat());
      } else {
        System.out.println("No threat found for URI: " + uri);
      }
    }
  }
}
// [END webrisk_v1beta1_webriskservicev1beta1_uris_search]
