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

// [START discoveryengine_v1_userlicenseservice_userlicenses_batchupdate]
import com.google.cloud.discoveryengine.v1.BatchUpdateUserLicensesRequest;
import com.google.cloud.discoveryengine.v1.BatchUpdateUserLicensesResponse;
import com.google.cloud.discoveryengine.v1.UserLicense;
import com.google.cloud.discoveryengine.v1.UserLicenseServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class BatchUpdateUserLicenses {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String userStoreId = "default_user_store";
    batchUpdateUserLicenses(projectId, locationId, userStoreId);
  }

  public static void batchUpdateUserLicenses(
      String projectId, String locationId, String userStoreId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (UserLicenseServiceClient client = UserLicenseServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/userStores/%s", projectId, locationId, userStoreId);

      UserLicense userLicense =
          UserLicense.newBuilder()
              .setUserPrincipal("example-user@example.com")
              .build();

      BatchUpdateUserLicensesRequest.InlineSource inlineSource =
          BatchUpdateUserLicensesRequest.InlineSource.newBuilder()
              .addUserLicenses(userLicense)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("license_config").build();

      BatchUpdateUserLicensesRequest request =
          BatchUpdateUserLicensesRequest.newBuilder()
              .setParent(parent)
              .setInlineSource(inlineSource)
              .build();

      // BatchUpdateUserLicenses is a long-running operation; wait for it to complete.
      BatchUpdateUserLicensesResponse response =
          client.batchUpdateUserLicensesAsync(request).get(5, TimeUnit.MINUTES);

      System.out.println("Batch update completed: " + response);
    }
  }
}
// [END discoveryengine_v1_userlicenseservice_userlicenses_batchupdate]
