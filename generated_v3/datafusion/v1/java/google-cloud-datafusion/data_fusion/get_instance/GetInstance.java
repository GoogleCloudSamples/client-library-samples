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

package com.google.cloud.datafusion.v1;

// [START datafusion_v1_datafusion_instance_get]
import com.google.cloud.datafusion.v1.DataFusionClient;
import com.google.cloud.datafusion.v1.GetInstanceRequest;
import com.google.cloud.datafusion.v1.Instance;
import com.google.cloud.datafusion.v1.InstanceName;
import java.io.IOException;

public class GetInstance {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String instanceId = "example-instance-id";
    getInstance(projectId, locationId, instanceId);
  }

  public static void getInstance(String projectId, String locationId, String instanceId)
      throws IOException {
    try (DataFusionClient client = DataFusionClient.create()) {
      String name = InstanceName.of(projectId, locationId, instanceId).toString();
      GetInstanceRequest request = GetInstanceRequest.newBuilder().setName(name).build();

      Instance instance = client.getInstance(request);
      System.out.println("Instance name: " + instance.getName());
      System.out.println("Instance state: " + instance.getState());
      System.out.println("Instance type: " + instance.getType());
      System.out.println("Instance version: " + instance.getVersion());
      System.out.println("Service endpoint: " + instance.getServiceEndpoint());
    }
  }
}
// [END datafusion_v1_datafusion_instance_get]
