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

package com.google.cloud.cloudresourcemanager.v3;

// [START cloudresourcemanager_v3_tagkeys_iampolicy_get]
import com.google.cloud.resourcemanager.v3.TagKeysClient;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  public static void main(String[] args) throws IOException {
    String tagKeyId = "example-tag-key-id";
    getIamPolicy(tagKeyId);
  }

  public static void getIamPolicy(String tagKeyId) throws IOException {
    try (TagKeysClient client = TagKeysClient.create()) {
      // Format the resource identifier required by the IAM policy request
      String resource = "tagKeys/" + tagKeyId;

      GetIamPolicyRequest request =
          GetIamPolicyRequest.newBuilder()
              .setResource(resource)
              .build();

      Policy policy = client.getIamPolicy(request);

      System.out.println("Retrieved IAM policy for: " + resource);
      System.out.println("Policy bindings count: " + policy.getBindingsCount());
    }
  }
}
// [END cloudresourcemanager_v3_tagkeys_iampolicy_get]
