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

// [START file_v1_cloudfilestoremanager_instance_update]
import com.google.cloud.filestore.v1.CloudFilestoreManagerClient;
import com.google.cloud.filestore.v1.Instance;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class UpdateInstance {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "us-central1-c";
    String instanceId = "example-instance-id";
    updateInstance(projectId, locationId, instanceId);
  }

  public static void updateInstance(String projectId, String locationId, String instanceId)
      throws IOException, ExecutionException, InterruptedException {
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      Instance instance =
          Instance.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/instances/%s", projectId, locationId, instanceId))
              .setDescription("Updated Filestore instance description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // UpdateInstance is a long-running operation; wait for the operation to complete.
      Instance response = client.updateInstanceAsync(instance, updateMask).get();
      System.out.println("Updated Filestore instance: " + response.getName());
    }
  }
}
// [END file_v1_cloudfilestoremanager_instance_update]
