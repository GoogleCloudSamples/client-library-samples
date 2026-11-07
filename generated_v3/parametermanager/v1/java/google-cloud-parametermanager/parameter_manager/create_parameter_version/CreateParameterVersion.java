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

// [START parametermanager_v1_parametermanager_parameterversion_create]
import com.google.cloud.parametermanager.v1.ParameterManagerClient;
import com.google.cloud.parametermanager.v1.ParameterName;
import com.google.cloud.parametermanager.v1.ParameterVersion;
import com.google.cloud.parametermanager.v1.ParameterVersionPayload;
import com.google.protobuf.ByteString;
import java.io.IOException;

public class CreateParameterVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String parameterId = "example-parameter-id";
    String parameterVersionId = "v1";
    createParameterVersion(projectId, locationId, parameterId, parameterVersionId);
  }

  public static void createParameterVersion(
      String projectId, String locationId, String parameterId, String parameterVersionId)
      throws Exception {
    // Initialize client that will be automatically closed at the end of the try block.
    try (ParameterManagerClient client = ParameterManagerClient.create()) {
      String parent = ParameterName.of(projectId, locationId, parameterId).toString();
      ParameterVersion parameterVersion =
          ParameterVersion.newBuilder()
              .setPayload(
                  ParameterVersionPayload.newBuilder()
                      .setData(ByteString.copyFromUtf8("example-parameter-value"))
                      .build())
              .build();

      ParameterVersion response =
          client.createParameterVersion(parent, parameterVersion, parameterVersionId);

      System.out.println("Created parameter version: " + response.getName());
    }
  }
}
// [END parametermanager_v1_parametermanager_parameterversion_create]
