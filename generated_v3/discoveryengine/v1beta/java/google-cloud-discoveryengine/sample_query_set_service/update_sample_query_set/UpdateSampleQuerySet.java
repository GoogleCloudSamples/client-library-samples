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

package com.google.cloud.discoveryengine.v1beta;

// [START discoveryengine_v1beta_samplequerysetservice_samplequeryset_update]
import com.google.cloud.discoveryengine.v1beta.SampleQuerySet;
import com.google.cloud.discoveryengine.v1beta.SampleQuerySetName;
import com.google.cloud.discoveryengine.v1beta.SampleQuerySetServiceClient;
import com.google.protobuf.FieldMask;

public class UpdateSampleQuerySet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sampleQuerySetId = "example-sample-query-set-id";
    updateSampleQuerySet(projectId, locationId, sampleQuerySetId);
  }

  public static void updateSampleQuerySet(
      String projectId, String locationId, String sampleQuerySetId) throws Exception {
    try (SampleQuerySetServiceClient client = SampleQuerySetServiceClient.create()) {
      SampleQuerySet sampleQuerySet =
          SampleQuerySet.newBuilder()
              .setName(SampleQuerySetName.of(projectId, locationId, sampleQuerySetId).toString())
              .setDisplayName("Updated sample query set display name")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      SampleQuerySet response = client.updateSampleQuerySet(sampleQuerySet, updateMask);
      System.out.println("Updated sample query set: " + response.getName());
    }
  }
}
// [END discoveryengine_v1beta_samplequerysetservice_samplequeryset_update]
