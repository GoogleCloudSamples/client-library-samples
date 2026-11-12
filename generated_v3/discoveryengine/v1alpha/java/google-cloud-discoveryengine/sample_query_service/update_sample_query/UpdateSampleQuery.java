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

// [START discoveryengine_v1alpha_samplequeryservice_samplequery_update]
import com.google.cloud.discoveryengine.v1alpha.SampleQuery;
import com.google.cloud.discoveryengine.v1alpha.SampleQueryName;
import com.google.cloud.discoveryengine.v1alpha.SampleQueryServiceClient;
import com.google.protobuf.FieldMask;

public class UpdateSampleQuery {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sampleQuerySetId = "example-sample_query_set_id";
    String sampleQueryId = "example-sample_query_id";
    updateSampleQuery(projectId, locationId, sampleQuerySetId, sampleQueryId);
  }

  public static void updateSampleQuery(
      String projectId, String locationId, String sampleQuerySetId, String sampleQueryId)
      throws Exception {
    try (SampleQueryServiceClient client = SampleQueryServiceClient.create()) {
      SampleQuery sampleQuery =
          SampleQuery.newBuilder()
              .setName(
                  SampleQueryName.of(projectId, locationId, sampleQuerySetId, sampleQueryId)
                      .toString())
              .setQueryEntry(
                  SampleQuery.QueryEntry.newBuilder()
                      .setQuery("updated sample search query")
                      .build())
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("query_entry").build();

      SampleQuery response = client.updateSampleQuery(sampleQuery, updateMask);
      System.out.println("Updated sample query: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_samplequeryservice_samplequery_update]
