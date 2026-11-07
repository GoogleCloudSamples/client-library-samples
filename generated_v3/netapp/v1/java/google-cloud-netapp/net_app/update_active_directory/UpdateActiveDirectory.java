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

package com.google.cloud.netapp.v1;

// [START netapp_v1_netapp_activedirectory_update]
import com.google.cloud.netapp.v1.ActiveDirectory;
import com.google.cloud.netapp.v1.ActiveDirectoryName;
import com.google.cloud.netapp.v1.NetAppClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateActiveDirectory {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String activeDirectoryId = "example-active-directory-id";
    updateActiveDirectory(projectId, locationId, activeDirectoryId);
  }

  public static void updateActiveDirectory(
      String projectId, String locationId, String activeDirectoryId) throws Exception {
    try (NetAppClient client = NetAppClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      ActiveDirectory activeDirectory =
          ActiveDirectory.newBuilder()
              .setName(ActiveDirectoryName.of(projectId, locationId, activeDirectoryId).toString())
              .setDescription("Updated Active Directory description")
              .build();

      ActiveDirectory response =
          client.updateActiveDirectoryAsync(activeDirectory, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated Active Directory: " + response.getName());
    }
  }
}
// [END netapp_v1_netapp_activedirectory_update]
