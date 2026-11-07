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

package com.google.cloud.redis.v1;

// [START redis_v1_cloudredis_instance_get]
import com.google.cloud.redis.v1.CloudRedisClient;
import com.google.cloud.redis.v1.Instance;
import com.google.cloud.redis.v1.InstanceName;

public class GetInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String instanceId = "example-instance_id";
    getInstance(projectId, locationId, instanceId);
  }

  public static void getInstance(String projectId, String locationId, String instanceId)
      throws Exception {
    // Initialize client that will be closed when complete using try-with-resources
    try (CloudRedisClient client = CloudRedisClient.create()) {
      String name = InstanceName.of(projectId, locationId, instanceId).toString();
      Instance instance = client.getInstance(name);

      System.out.println("Retrieved instance: " + instance.getName());
      System.out.println("Host: " + instance.getHost());
      System.out.println("Port: " + instance.getPort());
      System.out.println("State: " + instance.getState());
    }
  }
}
// [END redis_v1_cloudredis_instance_get]
