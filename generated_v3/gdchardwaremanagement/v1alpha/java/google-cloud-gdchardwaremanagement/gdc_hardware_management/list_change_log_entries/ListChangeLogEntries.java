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

package com.google.cloud.gdchardwaremanagement.v1alpha;

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_changelogentries_list]
import com.google.cloud.gdchardwaremanagement.v1alpha.ChangeLogEntry;
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.OrderName;

public class ListChangeLogEntries {

  public static void listChangeLogEntries(String projectId, String locationId, String orderId)
      throws Exception {
    // Instantiate a client to send requests. Reusing the client across requests reduces overhead.
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = OrderName.of(projectId, locationId, orderId).toString();

      for (ChangeLogEntry entry : client.listChangeLogEntries(parent).iterateAll()) {
        System.out.println("Change log entry: " + entry.getName());
        System.out.println("Log message: " + entry.getLog());
      }
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_changelogentries_list]
