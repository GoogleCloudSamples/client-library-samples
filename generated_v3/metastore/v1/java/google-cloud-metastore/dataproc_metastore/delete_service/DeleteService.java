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

// [START metastore_v1_dataprocmetastore_service_delete]
import com.google.cloud.metastore.v1.DataprocMetastoreClient;
import com.google.cloud.metastore.v1.ServiceName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class DeleteService {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String serviceId = "example-service_id";
    String projectId = "example-project_id";
    deleteService(locationId, serviceId, projectId);
  }

  public static void deleteService(String locationId, String serviceId, String projectId)
      throws Exception {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String name = ServiceName.of(projectId, locationId, serviceId).toString();
      client.deleteServiceAsync(name).get();
      System.out.println("Deleted service: " + name);
    }
  }
}
// [END metastore_v1_dataprocmetastore_service_delete]
