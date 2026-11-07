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

// [START discoveryengine_v1_userlicenseservice_userlicenses_list]
import com.google.cloud.discoveryengine.v1.ListUserLicensesRequest;
import com.google.cloud.discoveryengine.v1.UserLicense;
import com.google.cloud.discoveryengine.v1.UserLicenseServiceClient;
import java.io.IOException;

public class ListUserLicenses {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String userStoreId = "example-user_store_id";
    listUserLicenses(projectId, locationId, userStoreId);
  }

  public static void listUserLicenses(String projectId, String locationId, String userStoreId)
      throws IOException {
    try (UserLicenseServiceClient client = UserLicenseServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/userStores/%s", projectId, locationId, userStoreId);

      ListUserLicensesRequest request =
          ListUserLicensesRequest.newBuilder().setParent(parent).build();

      for (UserLicense userLicense : client.listUserLicenses(request).iterateAll()) {
        System.out.println("User license: " + userLicense.getUserPrincipal());
      }
    }
  }
}
// [END discoveryengine_v1_userlicenseservice_userlicenses_list]
