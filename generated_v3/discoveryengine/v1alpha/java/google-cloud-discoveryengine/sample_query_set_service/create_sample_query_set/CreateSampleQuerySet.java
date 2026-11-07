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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_create]
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySet;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetServiceClient;

public class CreateSampleQuerySet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sampleQuerySetId = "example-sample-query-set-id";
    createSampleQuerySet(projectId, locationId, sampleQuerySetId);
  }

  public static void createSampleQuerySet(
      String projectId, String locationId, String sampleQuerySetId) throws Exception {
    try (SampleQuerySetServiceClient client = SampleQuerySetServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      SampleQuerySet sampleQuerySet =
          SampleQuerySet.newBuilder().setDisplayName("Example Sample Query Set").build();

      SampleQuerySet response =
          client.createSampleQuerySet(parent, sampleQuerySet, sampleQuerySetId);
      System.out.println("Created SampleQuerySet: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_create]
