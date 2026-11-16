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

package com.google.cloud.certificatemanager.v1;

// [START certificatemanager_v1_certificatemanager_trustconfig_update]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.TrustConfig;
import com.google.cloud.certificatemanager.v1.TrustConfigName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateTrustConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String trustConfigId = "example-trust_config_id";
    updateTrustConfig(projectId, locationId, trustConfigId);
  }

  public static void updateTrustConfig(String projectId, String locationId, String trustConfigId)
      throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      TrustConfig trustConfig =
          TrustConfig.newBuilder()
              .setName(TrustConfigName.of(projectId, locationId, trustConfigId).toString())
              .setDescription("Updated description for the trust configuration")
              .build();

      TrustConfig response =
          client.updateTrustConfigAsync(trustConfig, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated trust configuration: " + response.getName());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_trustconfig_update]
