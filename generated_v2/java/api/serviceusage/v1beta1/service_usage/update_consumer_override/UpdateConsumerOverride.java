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

package com.google.cloud.serviceusage.v1beta1;

// [START serviceusage_v1beta1_serviceusage_consumeroverride_update]
import com.google.api.serviceusage.v1beta1.QuotaOverride;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import com.google.api.serviceusage.v1beta1.UpdateConsumerOverrideRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateConsumerOverride {

  public static void main(String[] args) throws Exception {
    String name = "example-name";
    updateConsumerOverride(name);
  }

  public static void updateConsumerOverride(String name) throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      QuotaOverride override =
          QuotaOverride.newBuilder()
              .setOverrideValue(100L)
              .build();
      FieldMask updateMask =
          FieldMask.newBuilder()
              .addPaths("override_value")
              .build();

      UpdateConsumerOverrideRequest request =
          UpdateConsumerOverrideRequest.newBuilder()
              .setName(name)
              .setOverride(override)
              .setUpdateMask(updateMask)
              .build();

      QuotaOverride response = client.updateConsumerOverrideAsync(request).get(3, TimeUnit.MINUTES);
      System.out.println("Updated consumer override: " + response.getName());
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_consumeroverride_update]
