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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_infotypes_list]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.InfoTypeDescription;
import com.google.privacy.dlp.v2.ListInfoTypesRequest;
import com.google.privacy.dlp.v2.ListInfoTypesResponse;
import java.io.IOException;

public class ListInfoTypes {

  public static void main(String[] args) throws Exception {
    String locationId = "global";
    listInfoTypes(locationId);
  }

  public static void listInfoTypes(String locationId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("locations/%s", locationId);

      ListInfoTypesRequest request =
          ListInfoTypesRequest.newBuilder()
              .setParent(parent)
              .build();

      ListInfoTypesResponse response = client.listInfoTypes(request);
      for (InfoTypeDescription infoType : response.getInfoTypesList()) {
        System.out.printf("Name: %s%n", infoType.getName());
        System.out.printf("Display name: %s%n", infoType.getDisplayName());
      }
    }
  }
}
// [END dlp_v2_dlpservice_infotypes_list]
