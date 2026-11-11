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

package com.google.cloud.securitycenter.v1;

// [START securitycenter_v1_securitycenter_group_assets]
import com.google.cloud.securitycenter.v1.GroupAssetsRequest;
import com.google.cloud.securitycenter.v1.GroupResult;
import com.google.cloud.securitycenter.v1.OrganizationName;
import com.google.cloud.securitycenter.v1.SecurityCenterClient;
import com.google.cloud.securitycenter.v1.SecurityCenterClient.GroupAssetsPagedResponse;
import java.io.IOException;

public class GroupAssets {

  public static void groupAssets(String organizationId) throws IOException {
    if (organizationId == null || organizationId.isEmpty()) {
      System.out.println("Organization ID must be provided.");
      return;
    }

    try (SecurityCenterClient client = SecurityCenterClient.create()) {
      String parent =
          organizationId.startsWith("organizations/")
              ? organizationId
              : OrganizationName.of(organizationId).toString();
      String groupBy = "security_center_properties.resource_type";

      GroupAssetsRequest request =
          GroupAssetsRequest.newBuilder()
              .setParent(parent)
              .setGroupBy(groupBy)
              .build();

      GroupAssetsPagedResponse response = client.groupAssets(request);
      for (GroupResult element : response.iterateAll()) {
        System.out.printf("Group: %s, Count: %d%n", element.getPropertiesMap(), element.getCount());
      }
    }
  }
}
// [END securitycenter_v1_securitycenter_group_assets]
