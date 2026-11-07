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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_get]
import com.google.cloud.discoveryengine.v1alpha.GetSampleQuerySetRequest;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySet;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetName;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetServiceClient;

public class GetSampleQuerySet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String sampleQuerySetId = "example-sample-query-set-id";
    getSampleQuerySet(projectId, locationId, sampleQuerySetId);
  }

  public static void getSampleQuerySet(
      String projectId, String locationId, String sampleQuerySetId) throws Exception {
    try (SampleQuerySetServiceClient client = SampleQuerySetServiceClient.create()) {
      String name = SampleQuerySetName.of(projectId, locationId, sampleQuerySetId).toString();
      GetSampleQuerySetRequest request =
          GetSampleQuerySetRequest.newBuilder().setName(name).build();

      SampleQuerySet response = client.getSampleQuerySet(request);

      System.out.println("Retrieved Sample Query Set: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
    }
  }
}
// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_get]
