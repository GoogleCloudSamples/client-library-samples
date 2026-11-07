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

// [START redis_v1_cloudredis_instance_update]
import com.google.cloud.redis.v1.CloudRedisClient;
import com.google.cloud.redis.v1.Instance;
import com.google.cloud.redis.v1.InstanceName;
import com.google.protobuf.FieldMask;

public class UpdateInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String instanceId = "example-instance-id";
    updateInstance(projectId, locationId, instanceId);
  }

  public static void updateInstance(String projectId, String locationId, String instanceId)
      throws Exception {
    try (CloudRedisClient client = CloudRedisClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();
      Instance instance =
          Instance.newBuilder()
              .setName(InstanceName.of(projectId, locationId, instanceId).toString())
              .setDisplayName("Updated Example Instance")
              .build();

      Instance response = client.updateInstanceAsync(updateMask, instance).get();
      System.out.println("Updated instance: " + response.getName());
      System.out.println("Updated display name: " + response.getDisplayName());
    }
  }
}
// [END redis_v1_cloudredis_instance_update]
