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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_intercept_interceptendpointgroups_list]
import com.google.cloud.networksecurity.v1.InterceptClient;
import com.google.cloud.networksecurity.v1.InterceptEndpointGroup;

public class ListInterceptEndpointGroups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listInterceptEndpointGroups(projectId, locationId);
  }

  public static void listInterceptEndpointGroups(String projectId, String locationId)
      throws Exception {
    try (InterceptClient client = InterceptClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (InterceptEndpointGroup endpointGroup :
          client.listInterceptEndpointGroups(parent).iterateAll()) {
        System.out.println("Intercept Endpoint Group: " + endpointGroup.getName());
      }
    }
  }
}
// [END networksecurity_v1_intercept_interceptendpointgroups_list]
