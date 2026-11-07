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

// [START redis_v1_cloudredis_instance_create]
import com.google.cloud.redis.v1.CloudRedisClient;
import com.google.cloud.redis.v1.Instance;
import com.google.cloud.redis.v1.LocationName;

public class CreateInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String instanceId = "example-instance-id";
    createInstance(projectId, locationId, instanceId);
  }

  public static void createInstance(String projectId, String locationId, String instanceId)
      throws Exception {
    try (CloudRedisClient client = CloudRedisClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Instance instance =
          Instance.newBuilder()
              .setTier(Instance.Tier.BASIC)
              .setMemorySizeGb(1)
              .build();

      // Instance creation is a long-running operation.
      Instance response = client.createInstanceAsync(parent, instanceId, instance).get();
      System.out.printf("Created Redis instance: %s%n", response.getName());
    }
  }
}
// [END redis_v1_cloudredis_instance_create]
