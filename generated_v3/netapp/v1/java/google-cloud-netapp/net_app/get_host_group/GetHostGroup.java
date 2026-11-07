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

// [START netapp_v1_netapp_hostgroup_get]
import com.google.cloud.netapp.v1.GetHostGroupRequest;
import com.google.cloud.netapp.v1.HostGroup;
import com.google.cloud.netapp.v1.HostGroupName;
import com.google.cloud.netapp.v1.NetAppClient;

public class GetHostGroup {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String hostGroupId = "example-host_group_id";
    String projectId = "example-project_id";
    getHostGroup(locationId, hostGroupId, projectId);
  }

  public static void getHostGroup(String locationId, String hostGroupId, String projectId)
      throws Exception {
    // Initialize the client that will be used to send requests.
    try (NetAppClient client = NetAppClient.create()) {
      String name = HostGroupName.of(projectId, locationId, hostGroupId).toString();
      GetHostGroupRequest request = GetHostGroupRequest.newBuilder().setName(name).build();

      HostGroup response = client.getHostGroup(request);
      System.out.println("Host group name: " + response.getName());
    }
  }
}
// [END netapp_v1_netapp_hostgroup_get]
