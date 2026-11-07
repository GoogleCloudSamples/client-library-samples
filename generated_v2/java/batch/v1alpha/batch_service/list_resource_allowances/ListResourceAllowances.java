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

package com.google.cloud.batch.v1alpha;

// [START batch_v1alpha_batchservice_resourceallowances_list]
import com.google.cloud.batch.v1alpha.BatchServiceClient;
import com.google.cloud.batch.v1alpha.ListResourceAllowancesRequest;
import com.google.cloud.batch.v1alpha.ResourceAllowance;

public class ListResourceAllowances {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listResourceAllowances(projectId, locationId);
  }

  public static void listResourceAllowances(String projectId, String locationId) throws Exception {
    // Initialize client that will be used to send requests.
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListResourceAllowancesRequest request =
          ListResourceAllowancesRequest.newBuilder().setParent(parent).build();

      for (ResourceAllowance resourceAllowance :
          client.listResourceAllowances(request).iterateAll()) {
        System.out.println(resourceAllowance.getName());
      }
    }
  }
}
// [END batch_v1alpha_batchservice_resourceallowances_list]
