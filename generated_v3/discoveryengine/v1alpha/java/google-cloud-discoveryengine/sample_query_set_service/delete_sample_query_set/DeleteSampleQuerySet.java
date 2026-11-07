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

// [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_delete]
import com.google.cloud.discoveryengine.v1alpha.DeleteSampleQuerySetRequest;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetName;
import com.google.cloud.discoveryengine.v1alpha.SampleQuerySetServiceClient;
import java.io.IOException;

public class DeleteSampleQuerySet {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sampleQuerySetId = "example-sample-query-set-id";
    deleteSampleQuerySet(projectId, locationId, sampleQuerySetId);
  }

  public static void deleteSampleQuerySet(
      String projectId, String locationId, String sampleQuerySetId) throws IOException {
    // Initialize the client once; reuse it for multiple requests.
    try (SampleQuerySetServiceClient client = SampleQuerySetServiceClient.create()) {
      String name = SampleQuerySetName.of(projectId, locationId, sampleQuerySetId).toString();

      DeleteSampleQuerySetRequest request =
          DeleteSampleQuerySetRequest.newBuilder().setName(name).build();

      client.deleteSampleQuerySet(request);
      System.out.println("Deleted sample query set: " + name);
    }
  }
}
// [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_delete]
