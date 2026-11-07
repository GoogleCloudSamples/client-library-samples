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

package com.google.cloud.cloudbilling.v1;

// [START cloudbilling_v1_cloudbilling_test_iam_permissions]
import com.google.cloud.billing.v1.CloudBillingClient;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String billingAccountId = "example-billing-account-id";
    testIamPermissions(billingAccountId);
  }

  public static void testIamPermissions(String billingAccountId) throws IOException {
    try (CloudBillingClient client = CloudBillingClient.create()) {
      String resource = "billingAccounts/" + billingAccountId;
      List<String> permissions = Arrays.asList("billing.accounts.get", "billing.accounts.update");

      TestIamPermissionsResponse response = client.testIamPermissions(resource, permissions);

      System.out.println("Permissions granted for resource " + resource + ":");
      for (String permission : response.getPermissionsList()) {
        System.out.println(" - " + permission);
      }
    }
  }
}
// [END cloudbilling_v1_cloudbilling_test_iam_permissions]
