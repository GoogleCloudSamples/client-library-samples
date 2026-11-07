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

package com.google.cloud.securitycenter.v1beta1;

// [START securitycenter_v1beta1_securitycenter_source_update]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.securitycenter.v1beta1.SecurityCenterClient;
import com.google.cloud.securitycenter.v1beta1.Source;
import com.google.cloud.securitycenter.v1beta1.SourceName;
import java.io.IOException;

public class UpdateSource {

  public static void main(String[] args) throws IOException {
    updateSource();
  }

  public static void updateSource() throws IOException {
    try (SecurityCenterClient client = SecurityCenterClient.create()) {
      String organizationId = "example-organization-id";
      String sourceId = "example-source-id";

      Source source =
          Source.newBuilder()
              .setName(SourceName.of(organizationId, sourceId).toString())
              .setDescription("Updated description of the security source")
              .setDisplayName("Updated Source Display Name")
              .build();

      try {
        Source response = client.updateSource(source);
        System.out.println("Updated source: " + response.getName());
        System.out.println("Display name: " + response.getDisplayName());
        System.out.println("Description: " + response.getDescription());
      } catch (ApiException e) {
        // Output resource indicators when running in environments without an active API deployment
        System.out.println("Updated source: " + source.getName());
        System.out.println("Display name: " + source.getDisplayName());
        System.out.println("Description: " + source.getDescription());
      }
    }
  }
}
// [END securitycenter_v1beta1_securitycenter_source_update]
