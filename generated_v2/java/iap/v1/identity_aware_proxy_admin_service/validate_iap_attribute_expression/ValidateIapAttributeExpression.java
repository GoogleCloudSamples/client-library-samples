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

package com.google.cloud.iap.v1;

// [START iap_v1_identityawareproxyadminservice_validate_iap_attribute_expression]
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;
import com.google.cloud.iap.v1.ValidateIapAttributeExpressionRequest;
import com.google.cloud.iap.v1.ValidateIapAttributeExpressionResponse;
import java.io.IOException;

public class ValidateIapAttributeExpression {

  public static void main(String[] args) throws Exception {
    // Resource name of the IAP protected resource
    String name = "projects/example-project-id/iap_web";
    validateIapAttributeExpression(name);
  }

  public static void validateIapAttributeExpression(String name) throws Exception {
    try (IdentityAwareProxyAdminServiceClient client =
        IdentityAwareProxyAdminServiceClient.create()) {
      // Define the CEL expression to validate against the IAP resource
      String expression =
          "attributes.saml_attributes.filter(attribute, attribute.name in [\"admin\"])";

      ValidateIapAttributeExpressionRequest request =
          ValidateIapAttributeExpressionRequest.newBuilder()
              .setName(name)
              .setExpression(expression)
              .build();

      ValidateIapAttributeExpressionResponse response =
          client.validateIapAttributeExpression(request);

      System.out.println("Expression validated successfully: " + response);
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_validate_iap_attribute_expression]
