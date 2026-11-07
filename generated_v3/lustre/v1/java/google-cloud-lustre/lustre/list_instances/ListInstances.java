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

package com.google.cloud.lustre.v1;

// [START lustre_v1_lustre_instances_list]
import com.google.cloud.lustre.v1.Instance;
import com.google.cloud.lustre.v1.LustreClient;

public class ListInstances {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Specify a Google Cloud zone, or use "-" as a wildcard to list across all locations.
    String locationId = "us-central1-a";
    listInstances(projectId, locationId);
  }

  public static void listInstances(String projectId, String locationId) throws Exception {
    try (LustreClient client = LustreClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Instance instance : client.listInstances(parent).iterateAll()) {
        System.out.println("Instance: " + instance.getName());
      }
    }
  }
}
// [END lustre_v1_lustre_instances_list]
