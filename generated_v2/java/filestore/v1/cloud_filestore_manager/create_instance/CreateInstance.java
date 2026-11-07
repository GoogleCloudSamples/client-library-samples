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

package com.google.cloud.file.v1;

// [START file_v1_cloudfilestoremanager_instance_create]
import com.google.cloud.filestore.v1.CloudFilestoreManagerClient;
import com.google.cloud.filestore.v1.FileShareConfig;
import com.google.cloud.filestore.v1.Instance;
import com.google.cloud.filestore.v1.NetworkConfig;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateInstance {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "us-central1-c";
    String instanceId = "example-instance-id";
    createInstance(projectId, locationId, instanceId);
  }

  public static void createInstance(String projectId, String locationId, String instanceId)
      throws IOException, ExecutionException, InterruptedException {
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      FileShareConfig fileShareConfig =
          FileShareConfig.newBuilder()
              .setName("vol1")
              .setCapacityGb(1024L)
              .build();

      NetworkConfig networkConfig =
          NetworkConfig.newBuilder()
              .setNetwork("default")
              .addModes(NetworkConfig.AddressMode.MODE_IPV4)
              .build();

      Instance instance =
          Instance.newBuilder()
              .setTier(Instance.Tier.BASIC_HDD)
              .addFileShares(fileShareConfig)
              .addNetworks(networkConfig)
              .build();

      Instance response = client.createInstanceAsync(parent, instance, instanceId).get();
      System.out.println("Filestore instance created: " + response.getName());
    }
  }
}
// [END file_v1_cloudfilestoremanager_instance_create]
