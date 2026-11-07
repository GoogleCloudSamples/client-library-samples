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

package com.google.cloud.tpu.v2alpha1;

// [START tpu_v2alpha1_tpu_queuedresources_list]
import com.google.cloud.tpu.v2alpha1.LocationName;
import com.google.cloud.tpu.v2alpha1.QueuedResource;
import com.google.cloud.tpu.v2alpha1.TpuClient;
import java.io.IOException;

public class ListQueuedResources {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listQueuedResources(projectId, locationId);
  }

  public static void listQueuedResources(String projectId, String locationId) throws Exception {
    // Initialize client that will be closed when the block finishes.
    try (TpuClient client = TpuClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      // List all queued resources under the specified project and location.
      for (QueuedResource queuedResource : client.listQueuedResources(parent).iterateAll()) {
        System.out.println("Queued resource name: " + queuedResource.getName());
        System.out.println("Queued resource state: " + queuedResource.getState());
      }
    }
  }
}
// [END tpu_v2alpha1_tpu_queuedresources_list]
