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

package com.google.cloud.metastore.v1;

// [START metastore_v1_dataprocmetastore_service_update]
import com.google.cloud.metastore.v1.DataprocMetastoreClient;
import com.google.cloud.metastore.v1.Service;
import com.google.cloud.metastore.v1.ServiceName;
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
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      Service service =
          Service.newBuilder()
              .setName(ServiceName.of(projectId, locationId, serviceId).toString())
              .putLabels("env", "test")
              .build();

      // UpdateService is a long-running operation; wait for operation completion.
      Service response = client.updateServiceAsync(service, updateMask).get();
      System.out.println("Service updated successfully: " + response.getName());
    }
  }
}
// [END metastore_v1_dataprocmetastore_service_update]
