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

package com.google.cloud.run.v2;

// [START run_v2_services_service_update]
import com.google.cloud.run.v2.Service;
import com.google.cloud.run.v2.ServiceName;
import com.google.cloud.run.v2.ServicesClient;
import com.google.cloud.run.v2.UpdateServiceRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceId = "example-service_id";
    updateService(projectId, locationId, serviceId);
  }

  public static void updateService(String projectId, String locationId, String serviceId)
      throws Exception {
    try (ServicesClient client = ServicesClient.create()) {
      Service service =
          Service.newBuilder()
              .setName(ServiceName.of(projectId, locationId, serviceId).toString())
              .setDescription("Updated service description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      UpdateServiceRequest request =
          UpdateServiceRequest.newBuilder()
              .setService(service)
              .setUpdateMask(updateMask)
              .build();

      Service response = client.updateServiceAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Service updated successfully: " + response.getName());
    }
  }
}
// [END run_v2_services_service_update]
