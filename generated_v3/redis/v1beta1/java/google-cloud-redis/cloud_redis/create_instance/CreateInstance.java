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

// [START redis_v1beta1_cloudredis_instance_create]
import com.google.cloud.redis.v1beta1.CloudRedisClient;
import com.google.cloud.redis.v1beta1.Instance;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateInstance {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId =
        System.getProperty(
            "projectId",
            System.getenv().getOrDefault("GOOGLE_CLOUD_PROJECT", "example-project-id"));
    String locationId =
        System.getProperty(
            "locationId",
            System.getenv().getOrDefault("GOOGLE_CLOUD_REGION", "us-central1"));
    String instanceId =
        System.getProperty(
            "instanceId",
            System.getenv().getOrDefault("INSTANCE_ID", "example-instance-id"));

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      locationId = args[1];
    }
    if (args.length > 2) {
      instanceId = args[2];
    }

    createInstance(projectId, locationId, instanceId);
  }

  public static void createInstance(String projectId, String locationId, String instanceId)
      throws IOException, ExecutionException, InterruptedException {
    try (CloudRedisClient client = CloudRedisClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Instance instance =
          Instance.newBuilder()
              .setTier(Instance.Tier.BASIC)
              .setMemorySizeGb(1)
              .build();

      Instance response = client.createInstanceAsync(parent, instanceId, instance).get();
      System.out.println("Created instance: " + response.getName());
    }
  }
}
// [END redis_v1beta1_cloudredis_instance_create]
