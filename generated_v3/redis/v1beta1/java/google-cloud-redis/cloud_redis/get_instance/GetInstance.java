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

package com.google.cloud.redis.v1beta1;

// [START redis_v1beta1_cloudredis_instance_get]
import com.google.cloud.redis.v1beta1.CloudRedisClient;
import com.google.cloud.redis.v1beta1.Instance;
import com.google.cloud.redis.v1beta1.InstanceName;
import java.io.IOException;

public class GetInstance {

  public static void getInstance(String projectId, String locationId, String instanceId)
      throws IOException {
    // Initialize client that will be closed when the block finishes
    try (CloudRedisClient client = CloudRedisClient.create()) {
      String name = InstanceName.of(projectId, locationId, instanceId).toString();
      Instance response = client.getInstance(name);
      System.out.println("Instance name: " + response.getName());
      System.out.println("Host: " + response.getHost());
      System.out.println("Port: " + response.getPort());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END redis_v1beta1_cloudredis_instance_get]
