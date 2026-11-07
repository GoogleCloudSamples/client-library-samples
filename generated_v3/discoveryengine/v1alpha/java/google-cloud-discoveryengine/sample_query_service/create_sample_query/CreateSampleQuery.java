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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_samplequeryservice_samplequery_create]
import com.google.cloud.discoveryengine.v1alpha.SampleQuery;
import com.google.cloud.discoveryengine.v1alpha.SampleQueryServiceClient;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetName;
import java.io.IOException;

public class CreateSampleQuery {

  public static void createSampleQuery(
      String projectId, String locationId, String sampleQuerySetId, String sampleQueryId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (SampleQueryServiceClient client = SampleQueryServiceClient.create()) {
      String parent = SampleQuerySetName.of(projectId, locationId, sampleQuerySetId).toString();
      SampleQuery sampleQuery =
          SampleQuery.newBuilder()
              .setQueryEntry(
                  SampleQuery.QueryEntry.newBuilder()
                      .setQuery("example search query")
                      .build())
              .build();

      SampleQuery response = client.createSampleQuery(parent, sampleQuery, sampleQueryId);
      System.out.println("Created sample query: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_samplequeryservice_samplequery_create]
