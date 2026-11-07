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

// [START parametermanager_v1_parametermanager_parameters_list]
import com.google.cloud.parametermanager.v1.LocationName;
import com.google.cloud.parametermanager.v1.Parameter;
import com.google.cloud.parametermanager.v1.ParameterManagerClient;

public class ListParameters {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listParameters(projectId, locationId);
  }

  public static void listParameters(String projectId, String locationId) throws Exception {
    try (ParameterManagerClient client = ParameterManagerClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Parameter parameter : client.listParameters(parent).iterateAll()) {
        System.out.println("Found parameter: " + parameter.getName());
      }
    }
  }
}
// [END parametermanager_v1_parametermanager_parameters_list]
