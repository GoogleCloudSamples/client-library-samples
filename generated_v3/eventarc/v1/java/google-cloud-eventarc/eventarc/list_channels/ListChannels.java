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

// [START eventarc_v1_eventarc_channels_list]
import com.google.cloud.eventarc.v1.Channel;
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.LocationName;

public class ListChannels {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    listChannels(projectId, locationId);
  }

  public static void listChannels(String projectId, String locationId) throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Channel channel : client.listChannels(parent).iterateAll()) {
        System.out.println("Channel: " + channel.getName());
        System.out.println("State: " + channel.getState());
      }
    }
  }
}
// [END eventarc_v1_eventarc_channels_list]
