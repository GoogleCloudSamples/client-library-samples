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

// [START eventarc_v1_eventarc_channel_get]
import com.google.cloud.eventarc.v1.Channel;
import com.google.cloud.eventarc.v1.ChannelName;
import com.google.cloud.eventarc.v1.EventarcClient;

public class GetChannel {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String channelId = "example-channel-id";
    getChannel(projectId, locationId, channelId);
  }

  public static void getChannel(String projectId, String locationId, String channelId)
      throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String name = ChannelName.of(projectId, locationId, channelId).toString();
      Channel channel = client.getChannel(name);

      System.out.println("Channel name: " + channel.getName());
      System.out.println("Channel state: " + channel.getState());
    }
  }
}
// [END eventarc_v1_eventarc_channel_get]
