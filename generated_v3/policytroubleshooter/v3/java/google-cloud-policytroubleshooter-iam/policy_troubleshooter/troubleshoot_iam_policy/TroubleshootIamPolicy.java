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

package com.google.cloud.policytroubleshooter.v3;

// [START policytroubleshooter_v3_policytroubleshooter_troubleshoot_iam_policy]
import com.google.cloud.policytroubleshooter.iam.v3.AccessTuple;
import com.google.cloud.policytroubleshooter.iam.v3.PolicyTroubleshooterClient;
import com.google.cloud.policytroubleshooter.iam.v3.TroubleshootIamPolicyRequest;
import com.google.cloud.policytroubleshooter.iam.v3.TroubleshootIamPolicyResponse;

public class TroubleshootIamPolicy {

  public static void main(String[] args) throws Exception {
    String principal = "example-principal";
    String fullResourceName = "example-full_resource_name";
    String permission = "example-permission";
    troubleshootIamPolicy(principal, fullResourceName, permission);
  }

  public static void troubleshootIamPolicy(
      String principal, String fullResourceName, String permission) throws Exception {
    // Initialize the client that will be used to send requests.
    try (PolicyTroubleshooterClient client = PolicyTroubleshooterClient.create()) {
      AccessTuple accessTuple =
          AccessTuple.newBuilder()
              .setPrincipal(principal)
              .setFullResourceName(fullResourceName)
              .setPermission(permission)
              .build();

      TroubleshootIamPolicyRequest request =
          TroubleshootIamPolicyRequest.newBuilder()
              .setAccessTuple(accessTuple)
              .build();

      TroubleshootIamPolicyResponse response = client.troubleshootIamPolicy(request);

      System.out.println("Overall access state: " + response.getOverallAccessState());
    }
  }
}
// [END policytroubleshooter_v3_policytroubleshooter_troubleshoot_iam_policy]
