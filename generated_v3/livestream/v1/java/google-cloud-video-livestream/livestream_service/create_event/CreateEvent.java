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

package com.google.cloud.livestream.v1;

// [START livestream_v1_livestreamservice_event_create]
import com.google.cloud.video.livestream.v1.Event;
import com.google.cloud.video.livestream.v1.LivestreamServiceClient;
import com.google.protobuf.Duration;
import java.io.IOException;

public class CreateEvent {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String channelId = "example-channel-id";
    String eventId = "example-event-id";
    createEvent(projectId, locationId, channelId, eventId);
  }

  public static void createEvent(
      String projectId, String locationId, String channelId, String eventId) throws Exception {
    try (LivestreamServiceClient client = LivestreamServiceClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/channels/%s", projectId, locationId, channelId);

      Duration duration = Duration.newBuilder().setSeconds(30).build();
      Event.AdBreakTask adBreakTask = Event.AdBreakTask.newBuilder().setDuration(duration).build();
      Event event =
          Event.newBuilder()
              .setExecuteNow(true)
              .setAdBreak(adBreakTask)
              .build();

      Event response = client.createEvent(parent, event, eventId);
      System.out.println("Created event: " + response.getName());
    }
  }
}
// [END livestream_v1_livestreamservice_event_create]
