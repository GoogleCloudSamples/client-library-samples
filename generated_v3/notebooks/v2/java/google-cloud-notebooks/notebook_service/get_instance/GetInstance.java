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

package com.google.cloud.notebooks.v2;

// [START notebooks_v2_notebookservice_instance_get]
import com.google.cloud.notebooks.v2.Instance;
import com.google.cloud.notebooks.v2.InstanceName;
import com.google.cloud.notebooks.v2.NotebookServiceClient;

public class GetInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String instanceId = "example-instance_id";
    getInstance(projectId, locationId, instanceId);
  }

  public static void getInstance(String projectId, String locationId, String instanceId)
      throws Exception {
    // Initialize client using Application Default Credentials
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      String name = InstanceName.of(projectId, locationId, instanceId).toString();

      Instance response = client.getInstance(name);
      System.out.println("Instance name: " + response.getName());
      System.out.println("Instance state: " + response.getState());
    }
  }
}
// [END notebooks_v2_notebookservice_instance_get]
