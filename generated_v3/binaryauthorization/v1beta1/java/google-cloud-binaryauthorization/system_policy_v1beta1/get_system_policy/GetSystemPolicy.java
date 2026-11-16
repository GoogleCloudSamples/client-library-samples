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

package com.google.cloud.binaryauthorization.v1beta1;

// [START binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
import com.google.cloud.binaryauthorization.v1beta1.Policy;
import com.google.cloud.binaryauthorization.v1beta1.SystemPolicyV1Beta1Client;
import java.io.IOException;

public class GetSystemPolicy {

  public static void main(String[] args) throws Exception {
    String locationId = "global";
    getSystemPolicy(locationId);
  }

  public static void getSystemPolicy(String locationId) throws Exception {
    try (SystemPolicyV1Beta1Client client = SystemPolicyV1Beta1Client.create()) {
      String name = String.format("locations/%s/policy", locationId);
      Policy policy = client.getSystemPolicy(name);
      System.out.println("System policy retrieved: " + policy.getName());
    }
  }
}
// [END binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
