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

package com.google.cloud.metastore.v1alpha;

// [START metastore_v1alpha_dataprocmetastore_service_update]
import com.google.cloud.metastore.v1alpha.DataprocMetastoreClient;
import com.google.cloud.metastore.v1alpha.Service;
import com.google.cloud.metastore.v1alpha.ServiceName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String serviceId = "example-service-id";
    updateService(projectId, locationId, serviceId);
  }

  public static void updateService(String projectId, String locationId, String serviceId)
      throws Exception {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      Service service =
          Service.newBuilder()
              .setName(ServiceName.of(projectId, locationId, serviceId).toString())
              .putLabels("env", "test")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      // Updates can take several minutes to complete on Dataproc Metastore services.
      Service response = client.updateServiceAsync(service, updateMask).get(15, TimeUnit.MINUTES);
      System.out.println("Updated service: " + response.getName());
    }
  }
}
// [END metastore_v1alpha_dataprocmetastore_service_update]
