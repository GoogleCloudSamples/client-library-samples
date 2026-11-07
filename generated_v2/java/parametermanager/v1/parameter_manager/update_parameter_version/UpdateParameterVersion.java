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

// [START parametermanager_v1_parametermanager_parameterversion_update]
import com.google.cloud.parametermanager.v1.ParameterManagerClient;
import com.google.cloud.parametermanager.v1.ParameterVersion;
import com.google.cloud.parametermanager.v1.ParameterVersionName;
import com.google.protobuf.FieldMask;

public class UpdateParameterVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String parameterId = "example-parameter-id";
    String parameterVersionId = "1";
    updateParameterVersion(projectId, locationId, parameterId, parameterVersionId);
  }

  public static void updateParameterVersion(
      String projectId, String locationId, String parameterId, String parameterVersionId)
      throws Exception {
    // Initialize client that will be automatically closed at the end of the block.
    try (ParameterManagerClient client = ParameterManagerClient.create()) {
      ParameterVersion parameterVersion =
          ParameterVersion.newBuilder()
              .setName(
                  ParameterVersionName.of(
                          projectId, locationId, parameterId, parameterVersionId)
                      .toString())
              .setDisabled(true)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("disabled").build();

      ParameterVersion response = client.updateParameterVersion(parameterVersion, updateMask);
      System.out.println("Updated parameter version: " + response.getName());
      System.out.println("Disabled status: " + response.getDisabled());
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_update]
