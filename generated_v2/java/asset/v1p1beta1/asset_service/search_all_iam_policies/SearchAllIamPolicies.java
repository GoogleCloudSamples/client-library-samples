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

package com.google.cloud.cloudasset.v1p1beta1;

// [START cloudasset_v1p1beta1_assetservice_alliampolicies_search]
import com.google.cloud.asset.v1p1beta1.AssetServiceClient;
import com.google.cloud.asset.v1p1beta1.IamPolicySearchResult;
import com.google.cloud.asset.v1p1beta1.SearchAllIamPoliciesRequest;
import java.io.IOException;

public class SearchAllIamPolicies {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    searchAllIamPolicies(projectId);
  }

  public static void searchAllIamPolicies(String projectId) throws IOException {
    try (AssetServiceClient client = AssetServiceClient.create()) {
      String scope = String.format("projects/%s", projectId);
      String query = "";

      SearchAllIamPoliciesRequest request =
          SearchAllIamPoliciesRequest.newBuilder()
              .setScope(scope)
              .setQuery(query)
              .build();

      for (IamPolicySearchResult element : client.searchAllIamPolicies(request).iterateAll()) {
        System.out.printf("Resource: %s%n", element.getResource());
        System.out.printf("Policy: %s%n", element.getPolicy());
      }
    }
  }
}
// [END cloudasset_v1p1beta1_assetservice_alliampolicies_search]
