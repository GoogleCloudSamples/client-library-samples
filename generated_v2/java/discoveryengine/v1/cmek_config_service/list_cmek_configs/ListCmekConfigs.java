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

package com.google.cloud.discoveryengine.v1;

// [START discoveryengine_v1_cmekconfigservice_cmekconfigs_list]
import com.google.cloud.discoveryengine.v1.CmekConfig;
import com.google.cloud.discoveryengine.v1.CmekConfigServiceClient;
import com.google.cloud.discoveryengine.v1.ListCmekConfigsRequest;
import com.google.cloud.discoveryengine.v1.ListCmekConfigsResponse;
import com.google.cloud.discoveryengine.v1.LocationName;

public class ListCmekConfigs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listCmekConfigs(projectId, locationId);
  }

  public static void listCmekConfigs(String projectId, String locationId) throws Exception {
    try (CmekConfigServiceClient client = CmekConfigServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListCmekConfigsRequest request =
          ListCmekConfigsRequest.newBuilder()
              .setParent(parent)
              .build();

      ListCmekConfigsResponse response = client.listCmekConfigs(request);
      for (CmekConfig cmekConfig : response.getCmekConfigsList()) {
        System.out.println("CMEK config name: " + cmekConfig.getName());
        System.out.println("KMS key: " + cmekConfig.getKmsKey());
      }
    }
  }
}
// [END discoveryengine_v1_cmekconfigservice_cmekconfigs_list]
