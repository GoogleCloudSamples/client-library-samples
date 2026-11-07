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

// [START eventarc_v1_eventarc_channel_create]
import com.google.cloud.eventarc.v1.Channel;
import com.google.cloud.eventarc.v1.ChannelName;
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.LocationName;
import java.util.concurrent.TimeUnit;

public class CreateChannel {

  public static void main(String[] args) throws Exception {
    String channelId = "example-channel-id";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createChannel(channelId, projectId, locationId);
  }

  public static void createChannel(String channelId, String projectId, String locationId)
      throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Channel channel =
          Channel.newBuilder()
              .setName(ChannelName.of(projectId, locationId, channelId).toString())
              .build();

      Channel response =
          client.createChannelAsync(parent, channel, channelId).get(5, TimeUnit.MINUTES);
      System.out.println("Created channel: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_channel_create]
