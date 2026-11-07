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

package com.google.cloud.spanner.v1;

// [START spanner_v1_instanceadmin_instance_get]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.spanner.admin.instance.v1.Instance;
import java.io.IOException;

public class GetInstance {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String instanceId = "example-instance-id";
    getInstance(projectId, instanceId);
  }

  public static void getInstance(String projectId, String instanceId) throws IOException {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String name = String.format("projects/%s/instances/%s", projectId, instanceId);
      Instance response = client.getInstance(name);
      System.out.println("Instance: " + response.getName());
    }
  }
}
// [END spanner_v1_instanceadmin_instance_get]
