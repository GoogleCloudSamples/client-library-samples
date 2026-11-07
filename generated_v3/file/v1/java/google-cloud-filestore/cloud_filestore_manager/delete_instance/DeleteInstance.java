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

// [START file_v1_cloudfilestoremanager_instance_delete]
import com.google.cloud.filestore.v1.CloudFilestoreManagerClient;
import com.google.cloud.filestore.v1.InstanceName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteInstance {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "us-central1-c";
    String instanceId = "example-instance-id";
    deleteInstance(projectId, locationId, instanceId);
  }

  public static void deleteInstance(String projectId, String locationId, String instanceId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      String name = InstanceName.of(projectId, locationId, instanceId).toString();

      // Deleting a Filestore instance is a long-running operation.
      client.deleteInstanceAsync(name).get(20, TimeUnit.MINUTES);
      System.out.println("Deleted Filestore instance: " + name);
    }
  }
}
// [END file_v1_cloudfilestoremanager_instance_delete]
