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

package com.google.cloud.alloydb.v1beta;

// [START alloydb_v1beta_alloydbadmin_supporteddatabaseflags_list]
import com.google.cloud.alloydb.v1beta.AlloyDBAdminClient;
import com.google.cloud.alloydb.v1beta.LocationName;
import com.google.cloud.alloydb.v1beta.SupportedDatabaseFlag;
import java.io.IOException;

public class ListSupportedDatabaseFlags {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listSupportedDatabaseFlags(projectId, locationId);
  }

  public static void listSupportedDatabaseFlags(String projectId, String locationId)
      throws Exception {
    try (AlloyDBAdminClient client = AlloyDBAdminClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (SupportedDatabaseFlag flag : client.listSupportedDatabaseFlags(parent).iterateAll()) {
        System.out.printf("Flag name: %s%n", flag.getName());
        System.out.printf("Value type: %s%n", flag.getValueType());
      }
    }
  }
}
// [END alloydb_v1beta_alloydbadmin_supporteddatabaseflags_list]
