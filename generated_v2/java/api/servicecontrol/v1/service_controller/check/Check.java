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

package com.google.cloud.servicecontrol.v1;

// [START servicecontrol_v1_servicecontroller_check]
import com.google.api.servicecontrol.v1.CheckRequest;
import com.google.api.servicecontrol.v1.CheckResponse;
import com.google.api.servicecontrol.v1.Operation;
import com.google.api.servicecontrol.v1.ServiceControllerClient;
import com.google.protobuf.Timestamp;
import java.time.Instant;
import java.util.UUID;

public class Check {

  public static void main(String[] args) throws Exception {
    String serviceName = "example-service-name";
    check(serviceName);
  }

  public static void check(String serviceName) throws Exception {
    try (ServiceControllerClient client = ServiceControllerClient.create()) {
      Instant now = Instant.now();
      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();

      Operation operation =
          Operation.newBuilder()
              .setOperationId(UUID.randomUUID().toString())
              .setOperationName("google.pubsub.v1.Publisher.Publish")
              .setConsumerId("project:example-project-id")
              .setStartTime(startTime)
              .build();

      CheckRequest request =
          CheckRequest.newBuilder()
              .setServiceName(serviceName)
              .setOperation(operation)
              .build();

      CheckResponse response = client.check(request);
      System.out.println("Operation ID: " + response.getOperationId());
      if (response.getCheckErrorsCount() > 0) {
        System.out.println("Check errors encountered: " + response.getCheckErrorsCount());
      } else {
        System.out.println("Check passed successfully.");
      }
    }
  }
}
// [END servicecontrol_v1_servicecontroller_check]
