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

// [START networkservices_v1_depservice_lbedgeextensions_list]
import com.google.cloud.networkservices.v1.DepServiceClient;
import com.google.cloud.networkservices.v1.LbEdgeExtension;
import com.google.cloud.networkservices.v1.ListLbEdgeExtensionsRequest;
import java.io.IOException;

public class ListLbEdgeExtensions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listLbEdgeExtensions(projectId, locationId);
  }

  public static void listLbEdgeExtensions(String projectId, String locationId) throws IOException {
    try (DepServiceClient client = DepServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListLbEdgeExtensionsRequest request =
          ListLbEdgeExtensionsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (LbEdgeExtension extension : client.listLbEdgeExtensions(request).iterateAll()) {
        System.out.println("LbEdgeExtension name: " + extension.getName());
      }
    }
  }
}
// [END networkservices_v1_depservice_lbedgeextensions_list]
