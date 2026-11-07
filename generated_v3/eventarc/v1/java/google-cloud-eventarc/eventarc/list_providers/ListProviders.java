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

package com.google.cloud.eventarc.v1;

// [START eventarc_v1_eventarc_providers_list]
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.Provider;

public class ListProviders {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listProviders(projectId, locationId);
  }

  public static void listProviders(String projectId, String locationId) throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Provider provider : client.listProviders(parent).iterateAll()) {
        System.out.println("Provider: " + provider.getName());
      }
    }
  }
}
// [END eventarc_v1_eventarc_providers_list]
