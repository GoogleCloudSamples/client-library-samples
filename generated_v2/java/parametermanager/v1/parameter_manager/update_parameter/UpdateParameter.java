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

// [START parametermanager_v1_parametermanager_parameter_update]
import com.google.cloud.parametermanager.v1.Parameter;
import com.google.cloud.parametermanager.v1.ParameterManagerClient;
import com.google.cloud.parametermanager.v1.ParameterName;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateParameter {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String parameterId = "example-parameter_id";
    updateParameter(projectId, locationId, parameterId);
  }

  public static void updateParameter(String projectId, String locationId, String parameterId)
      throws Exception {
    try (ParameterManagerClient client = ParameterManagerClient.create()) {
      Parameter parameter =
          Parameter.newBuilder()
              .setName(ParameterName.of(projectId, locationId, parameterId).toString())
              .putLabels("env", "prod")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      Parameter response = client.updateParameter(parameter, updateMask);
      System.out.println("Updated parameter: " + response.getName());
    }
  }
}
// [END parametermanager_v1_parametermanager_parameter_update]
