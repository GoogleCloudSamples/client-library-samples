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

// [START eventarc_v1_eventarc_channel_update]
import com.google.cloud.eventarc.v1.Channel;
import com.google.cloud.eventarc.v1.ChannelName;
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateChannel {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String channelId = "example-channel_id";
    updateChannel(projectId, locationId, channelId);
  }

  public static void updateChannel(String projectId, String locationId, String channelId) throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      Channel channel =
          Channel.newBuilder()
              .setName(ChannelName.of(projectId, locationId, channelId).toString())
              .putLabels("updated", "true")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      Channel response = client.updateChannelAsync(channel, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated channel: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_channel_update]
