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

package com.google.cloud.parametermanager.v1;

// [START parametermanager_v1_parametermanager_parameterversion_delete]
import com.google.cloud.parametermanager.v1.ParameterManagerClient;
import com.google.cloud.parametermanager.v1.ParameterVersionName;

public class DeleteParameterVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String parameterId = "example-parameter-id";
    String parameterVersionId = "example-parameter-version-id";
    deleteParameterVersion(projectId, locationId, parameterId, parameterVersionId);
  }

  public static void deleteParameterVersion(
      String projectId, String locationId, String parameterId, String parameterVersionId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ParameterManagerClient client = ParameterManagerClient.create()) {
      String name =
          ParameterVersionName.of(projectId, locationId, parameterId, parameterVersionId)
              .toString();

      client.deleteParameterVersion(name);
      System.out.printf("Deleted parameter version: %s%n", name);
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_delete]
