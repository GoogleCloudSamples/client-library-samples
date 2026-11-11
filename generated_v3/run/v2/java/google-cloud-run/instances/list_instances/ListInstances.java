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

package com.google.cloud.run.v2;

// [START run_v2_instances_instances_list]
import com.google.cloud.run.v2.Instance;
import com.google.cloud.run.v2.InstancesClient;

public class ListInstances {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listInstances(projectId, locationId);
  }

  public static void listInstances(String projectId, String locationId) throws Exception {
    try (InstancesClient client = InstancesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Instance instance : client.listInstances(parent).iterateAll()) {
        System.out.println("Instance: " + instance.getName());
      }
    }
  }
}
// [END run_v2_instances_instances_list]
