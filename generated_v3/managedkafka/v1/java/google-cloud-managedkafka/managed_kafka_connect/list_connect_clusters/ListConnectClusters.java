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

package com.google.cloud.managedkafka.v1;

// [START managedkafka_v1_managedkafkaconnect_connectclusters_list]
import com.google.cloud.managedkafka.v1.ConnectCluster;
import com.google.cloud.managedkafka.v1.LocationName;
import com.google.cloud.managedkafka.v1.ManagedKafkaConnectClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ListConnectClusters {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listConnectClusters(projectId, locationId);
  }

  public static void listConnectClusters(String projectId, String locationId) throws Exception {
    try (ManagedKafkaConnectClient client = ManagedKafkaConnectClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (ConnectCluster connectCluster : client.listConnectClusters(parent).iterateAll()) {
        System.out.println("Connect cluster name: " + connectCluster.getName());
      }
    }
  }
}
// [END managedkafka_v1_managedkafkaconnect_connectclusters_list]
