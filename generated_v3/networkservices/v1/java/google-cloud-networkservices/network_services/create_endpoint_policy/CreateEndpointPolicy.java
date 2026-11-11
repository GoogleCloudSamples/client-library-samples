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

package com.google.cloud.networkservices.v1;

// [START networkservices_v1_networkservices_endpointpolicy_create]
import com.google.cloud.networkservices.v1.EndpointMatcher;
import com.google.cloud.networkservices.v1.EndpointPolicy;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateEndpointPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String endpointPolicyId = "example-endpoint-policy-id";
    createEndpointPolicy(projectId, locationId, endpointPolicyId);
  }

  public static void createEndpointPolicy(
      String projectId, String locationId, String endpointPolicyId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      EndpointMatcher.MetadataLabelMatcher.MetadataLabels metadataLabels =
          EndpointMatcher.MetadataLabelMatcher.MetadataLabels.newBuilder()
              .setLabelName("env")
              .setLabelValue("prod")
              .build();

      EndpointMatcher.MetadataLabelMatcher metadataLabelMatcher =
          EndpointMatcher.MetadataLabelMatcher.newBuilder()
              .setMetadataLabelMatchCriteria(
                  EndpointMatcher.MetadataLabelMatcher.MetadataLabelMatchCriteria.MATCH_ALL)
              .addMetadataLabels(metadataLabels)
              .build();

      EndpointMatcher endpointMatcher =
          EndpointMatcher.newBuilder()
              .setMetadataLabelMatcher(metadataLabelMatcher)
              .build();

      EndpointPolicy endpointPolicy =
          EndpointPolicy.newBuilder()
              .setType(EndpointPolicy.EndpointPolicyType.SIDECAR_PROXY)
              .setEndpointMatcher(endpointMatcher)
              .build();

      EndpointPolicy response =
          client
              .createEndpointPolicyAsync(parent, endpointPolicy, endpointPolicyId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created EndpointPolicy: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_endpointpolicy_create]
