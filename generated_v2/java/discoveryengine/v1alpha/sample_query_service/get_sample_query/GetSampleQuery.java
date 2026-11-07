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

// [START discoveryengine_v1alpha_samplequeryservice_samplequery_get]
import com.google.cloud.discoveryengine.v1alpha.GetSampleQueryRequest;
import com.google.cloud.discoveryengine.v1alpha.SampleQuery;
import com.google.cloud.discoveryengine.v1alpha.SampleQueryName;
import com.google.cloud.discoveryengine.v1alpha.SampleQueryServiceClient;
import java.io.IOException;

public class GetSampleQuery {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String sampleQuerySetId = "example-sample-query-set-id";
    String sampleQueryId = "example-sample-query-id";
    getSampleQuery(projectId, locationId, sampleQuerySetId, sampleQueryId);
  }

  public static void getSampleQuery(
      String projectId, String locationId, String sampleQuerySetId, String sampleQueryId)
      throws IOException {
    try (SampleQueryServiceClient client = SampleQueryServiceClient.create()) {
      String name =
          SampleQueryName.of(projectId, locationId, sampleQuerySetId, sampleQueryId).toString();

      GetSampleQueryRequest request = GetSampleQueryRequest.newBuilder().setName(name).build();

      SampleQuery response = client.getSampleQuery(request);
      System.out.println("Retrieved sample query: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_samplequeryservice_samplequery_get]
