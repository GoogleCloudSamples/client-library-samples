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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_mirroring_mirroringdeployments_list]
import com.google.cloud.networksecurity.v1.MirroringClient;
import com.google.cloud.networksecurity.v1.MirroringDeployment;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ListMirroringDeployments {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listMirroringDeployments(projectId, locationId);
  }

  public static void listMirroringDeployments(String projectId, String locationId) throws Exception {
    try (MirroringClient client = MirroringClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (MirroringDeployment deployment : client.listMirroringDeployments(parent).iterateAll()) {
        System.out.println("Mirroring deployment name: " + deployment.getName());
      }
    }
  }
}
// [END networksecurity_v1_mirroring_mirroringdeployments_list]
