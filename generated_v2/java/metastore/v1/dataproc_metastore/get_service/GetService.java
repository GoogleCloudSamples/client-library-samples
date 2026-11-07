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

// [START metastore_v1_dataprocmetastore_service_get]
import com.google.cloud.metastore.v1.DataprocMetastoreClient;
import com.google.cloud.metastore.v1.Service;
import com.google.cloud.metastore.v1.ServiceName;

public class GetService {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    String serviceId = "example-service_id";
    getService(locationId, projectId, serviceId);
  }

  public static void getService(String locationId, String projectId, String serviceId)
      throws Exception {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String name = ServiceName.format(projectId, locationId, serviceId);
      Service service = client.getService(name);
      System.out.println("Retrieved service: " + service.getName());
    }
  }
}
// [END metastore_v1_dataprocmetastore_service_get]
