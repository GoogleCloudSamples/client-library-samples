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

package com.google.cloud.networkservices.v1;

// [START networkservices_v1_depservice_authzextension_delete]
import com.google.cloud.networkservices.v1.AuthzExtensionName;
import com.google.cloud.networkservices.v1.DepServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteAuthzExtension {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String authzExtensionId = "example-authz_extension_id";
    deleteAuthzExtension(projectId, locationId, authzExtensionId);
  }

  public static void deleteAuthzExtension(
      String projectId, String locationId, String authzExtensionId) throws Exception {
    try (DepServiceClient client = DepServiceClient.create()) {
      String name = AuthzExtensionName.of(projectId, locationId, authzExtensionId).toString();

      // Authorization extension deletion is a long-running operation.
      client.deleteAuthzExtensionAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted authorization extension: " + name);
    }
  }
}
// [END networkservices_v1_depservice_authzextension_delete]
