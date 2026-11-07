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

// [START gkehub_v1_gkehub_scope_update]
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.cloud.gkehub.v1.Scope;
import com.google.cloud.gkehub.v1.ScopeName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateScope {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String scopeId = "example-scope-id";
    updateScope(projectId, locationId, scopeId);
  }

  public static void updateScope(String projectId, String locationId, String scopeId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      Scope scope =
          Scope.newBuilder()
              .setName(ScopeName.of(projectId, locationId, scopeId).toString())
              .putLabels("env", "staging")
              .build();

      // Wait for the long-running operation to complete.
      Scope response = client.updateScopeAsync(scope, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated Scope: " + response.getName());
    }
  }
}
// [END gkehub_v1_gkehub_scope_update]
