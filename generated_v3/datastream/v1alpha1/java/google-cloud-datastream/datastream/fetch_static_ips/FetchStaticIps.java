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

package com.google.cloud.datastream.v1alpha1;

// [START datastream_v1alpha1_datastream_fetch_static_ips]
import com.google.cloud.datastream.v1alpha1.DatastreamClient;
import java.io.IOException;

public class FetchStaticIps {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    fetchStaticIps(projectId, locationId);
  }

  public static void fetchStaticIps(String projectId, String locationId) throws Exception {
    try (DatastreamClient client = DatastreamClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      for (String ip : client.fetchStaticIps(name).iterateAll()) {
        System.out.println("Static IP: " + ip);
      }
    }
  }
}
// [END datastream_v1alpha1_datastream_fetch_static_ips]
