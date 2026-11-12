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

package com.google.cloud.networkconnectivity.v1beta;

// [START networkconnectivity_v1beta_hubservice_hub_delete]
import com.google.cloud.networkconnectivity.v1beta.HubName;
import com.google.cloud.networkconnectivity.v1beta.HubServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteHub {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    deleteHub(projectId, hubId);
  }

  public static void deleteHub(String projectId, String hubId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = HubName.of(projectId, hubId).toString();
      client.deleteHubAsync(name).get();
      System.out.println("Hub deleted: " + name);
    }
  }
}
// [END networkconnectivity_v1beta_hubservice_hub_delete]
