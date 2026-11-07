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

package com.google.cloud.gkehub.v1;

// [START gkehub_v1_gkehub_scoperbacrolebinding_create]
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.cloud.gkehub.v1.RBACRoleBinding;
import java.util.concurrent.TimeUnit;

public class CreateScopeRbacRoleBinding {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String scopeId = "example-scope-id";
    String rbacrolebindingId = "example-rbacrolebinding-id";
    createScopeRbacRoleBinding(projectId, locationId, scopeId, rbacrolebindingId);
  }

  public static void createScopeRbacRoleBinding(
      String projectId, String locationId, String scopeId, String rbacrolebindingId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/scopes/%s", projectId, locationId, scopeId);
      RBACRoleBinding rbacrolebinding =
          RBACRoleBinding.newBuilder()
              .setUser("user@example.com")
              .setRole(
                  RBACRoleBinding.Role.newBuilder()
                      .setPredefinedRole(RBACRoleBinding.Role.PredefinedRoles.ADMIN)
                      .build())
              .build();

      // Fleet scope role bindings are long-running operations.
      RBACRoleBinding response =
          client
              .createScopeRBACRoleBindingAsync(parent, rbacrolebinding, rbacrolebindingId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created Scope RBAC Role Binding: " + response.getName());
    }
  }
}
// [END gkehub_v1_gkehub_scoperbacrolebinding_create]
