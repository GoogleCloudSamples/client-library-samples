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

// [START metastore_v1_dataprocmetastore_services_list]
import com.google.cloud.metastore.v1.DataprocMetastoreClient;
import com.google.cloud.metastore.v1.LocationName;
import com.google.cloud.metastore.v1.Service;

public class ListServices {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    listServices(locationId, projectId);
  }

  public static void listServices(String locationId, String projectId) throws Exception {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Service service : client.listServices(parent).iterateAll()) {
        System.out.println("Found service: " + service.getName());
      }
    }
  }
}
// [END metastore_v1_dataprocmetastore_services_list]
