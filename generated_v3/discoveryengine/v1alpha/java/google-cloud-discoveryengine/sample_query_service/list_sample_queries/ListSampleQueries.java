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

// [START discoveryengine_v1alpha_samplequeryservice_samplequeries_list]
import com.google.cloud.discoveryengine.v1alpha.SampleQuery;
import com.google.cloud.discoveryengine.v1alpha.SampleQueryServiceClient;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetName;

public class ListSampleQueries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sampleQuerySetId = "example-sample_query_set_id";
    listSampleQueries(projectId, locationId, sampleQuerySetId);
  }

  public static void listSampleQueries(
      String projectId, String locationId, String sampleQuerySetId) throws Exception {
    try (SampleQueryServiceClient client = SampleQueryServiceClient.create()) {
      String parent = SampleQuerySetName.of(projectId, locationId, sampleQuerySetId).toString();

      for (SampleQuery sampleQuery : client.listSampleQueries(parent).iterateAll()) {
        System.out.println("Sample query name: " + sampleQuery.getName());
      }
    }
  }
}
// [END discoveryengine_v1alpha_samplequeryservice_samplequeries_list]
