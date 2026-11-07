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

// [START redis_v1beta1_cloudredis_failover_instance]
import com.google.cloud.redis.v1beta1.CloudRedisClient;
import com.google.cloud.redis.v1beta1.FailoverInstanceRequest;
import com.google.cloud.redis.v1beta1.Instance;
import com.google.cloud.redis.v1beta1.InstanceName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class FailoverInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String instanceId = "example-instance_id";
    failoverInstance(projectId, locationId, instanceId);
  }

  public static void failoverInstance(String projectId, String locationId, String instanceId)
      throws Exception {
    try (CloudRedisClient client = CloudRedisClient.create()) {
      String name = InstanceName.of(projectId, locationId, instanceId).toString();
      FailoverInstanceRequest.DataProtectionMode dataProtectionMode =
          FailoverInstanceRequest.DataProtectionMode.LIMITED_DATA_LOSS;

      // FailoverInstance initiates a long-running operation to fail over the primary node.
      Instance instance = client.failoverInstanceAsync(name, dataProtectionMode).get();
      System.out.println("Failover completed for instance: " + instance.getName());
    }
  }
}
// [END redis_v1beta1_cloudredis_failover_instance]
