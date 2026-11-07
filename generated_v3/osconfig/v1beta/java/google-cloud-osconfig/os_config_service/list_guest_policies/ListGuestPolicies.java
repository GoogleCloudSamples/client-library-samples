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

package com.google.cloud.osconfig.v1beta;

// [START osconfig_v1beta_osconfigservice_guestpolicies_list]
import com.google.cloud.osconfig.v1beta.GuestPolicies.GuestPolicy;
import com.google.cloud.osconfig.v1beta.GuestPolicies.ListGuestPoliciesRequest;
import com.google.cloud.osconfig.v1beta.OsConfigServiceClient;
import com.google.cloud.osconfig.v1beta.ProjectName;

public class ListGuestPolicies {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listGuestPolicies(projectId);
  }

  public static void listGuestPolicies(String projectId) throws Exception {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String parent = ProjectName.of(projectId).toString();
      ListGuestPoliciesRequest request =
          ListGuestPoliciesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (GuestPolicy guestPolicy : client.listGuestPolicies(request).iterateAll()) {
        System.out.println("Guest policy: " + guestPolicy.getName());
      }
    }
  }
}
// [END osconfig_v1beta_osconfigservice_guestpolicies_list]
