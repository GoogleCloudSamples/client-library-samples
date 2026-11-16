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

package com.google.cloud.alloydb.v1;

// [START alloydb_v1_alloydbadmin_supporteddatabaseflags_list]
import com.google.cloud.alloydb.v1.AlloyDBAdminClient;
import com.google.cloud.alloydb.v1.LocationName;
import com.google.cloud.alloydb.v1.SupportedDatabaseFlag;
import java.io.IOException;

public class ListSupportedDatabaseFlags {

  public static void listSupportedDatabaseFlags(String projectId, String locationId)
      throws IOException {
    try (AlloyDBAdminClient client = AlloyDBAdminClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (SupportedDatabaseFlag flag : client.listSupportedDatabaseFlags(parent).iterateAll()) {
        System.out.println("Flag Name: " + flag.getName());
        System.out.println("Flag Type: " + flag.getValueType());
      }
    }
  }
}
// [END alloydb_v1_alloydbadmin_supporteddatabaseflags_list]
