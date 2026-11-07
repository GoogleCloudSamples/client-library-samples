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

package com.google.cloud.livestream.v1;

// [START livestream_v1_livestreamservice_pool_get]
import com.google.cloud.video.livestream.v1.LivestreamServiceClient;
import com.google.cloud.video.livestream.v1.Pool;
import com.google.cloud.video.livestream.v1.PoolName;
import java.io.IOException;

public class GetPool {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String poolId = "example-pool-id";
    getPool(projectId, locationId, poolId);
  }

  public static void getPool(String projectId, String locationId, String poolId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (LivestreamServiceClient client = LivestreamServiceClient.create()) {
      String name = PoolName.of(projectId, locationId, poolId).toString();
      Pool response = client.getPool(name);
      System.out.println("Retrieved pool: " + response.getName());
    }
  }
}
// [END livestream_v1_livestreamservice_pool_get]
