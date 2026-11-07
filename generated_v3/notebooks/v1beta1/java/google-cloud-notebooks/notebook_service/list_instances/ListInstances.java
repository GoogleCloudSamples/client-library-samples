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

package com.google.cloud.notebooks.v1beta1;

// [START notebooks_v1beta1_notebookservice_instances_list]
import com.google.cloud.notebooks.v1beta1.Instance;
import com.google.cloud.notebooks.v1beta1.ListInstancesRequest;
import com.google.cloud.notebooks.v1beta1.NotebookServiceClient;
import java.io.IOException;

public class ListInstances {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1-a";
    listInstances(projectId, locationId);
  }

  public static void listInstances(String projectId, String locationId) throws IOException {
    // Initialize the client; it closes automatically after use
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListInstancesRequest request = ListInstancesRequest.newBuilder().setParent(parent).build();

      for (Instance instance : client.listInstances(request).iterateAll()) {
        System.out.println("Instance: " + instance.getName());
        System.out.println("State: " + instance.getState());
      }
    }
  }
}
// [END notebooks_v1beta1_notebookservice_instances_list]
