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

package com.google.cloud.cloudkms.v1;

// [START cloudkms_v1_ekmservice_ekmconfig_get]
import com.google.cloud.kms.v1.EkmConfig;
import com.google.cloud.kms.v1.EkmConfigName;
import com.google.cloud.kms.v1.EkmServiceClient;
import java.io.IOException;

public class GetEkmConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    getEkmConfig(projectId, locationId);
  }

  public static void getEkmConfig(String projectId, String locationId) throws IOException {
    try (EkmServiceClient client = EkmServiceClient.create()) {
      String name = EkmConfigName.format(projectId, locationId);

      EkmConfig response = client.getEkmConfig(name);
      System.out.println("EKM config name: " + response.getName());
    }
  }
}
// [END cloudkms_v1_ekmservice_ekmconfig_get]
