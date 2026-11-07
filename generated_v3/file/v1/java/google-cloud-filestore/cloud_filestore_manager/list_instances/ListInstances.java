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

package com.google.cloud.file.v1;

// [START file_v1_cloudfilestoremanager_instances_list]
import com.google.cloud.filestore.v1.CloudFilestoreManagerClient;
import com.google.cloud.filestore.v1.Instance;
import java.io.IOException;

public class ListInstances {

  public static void main(String[] args) throws IOException {
    // Provide a valid Google Cloud zone (for example, "us-central1-c") or "-" for all locations.
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listInstances(projectId, locationId);
  }

  public static void listInstances(String projectId, String locationId) throws IOException {
    // Initialize the client using try-with-resources.
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Instance instance : client.listInstances(parent).iterateAll()) {
        System.out.println("Instance name: " + instance.getName());
        System.out.println("State: " + instance.getState());
        System.out.println("Tier: " + instance.getTier());
      }
    }
  }
}
// [END file_v1_cloudfilestoremanager_instances_list]
