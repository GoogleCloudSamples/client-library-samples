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

// [START eventarc_v1_eventarc_messagebus_update]
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.MessageBus;
import com.google.cloud.eventarc.v1.MessageBusName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateMessageBus {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String messageBusId = "example-message_bus_id";
    updateMessageBus(projectId, locationId, messageBusId);
  }

  public static void updateMessageBus(String projectId, String locationId, String messageBusId)
      throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      MessageBus messageBus =
          MessageBus.newBuilder()
              .setName(MessageBusName.of(projectId, locationId, messageBusId).toString())
              .setDisplayName("Updated Message Bus")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // Initiate the asynchronous update and wait for the operation to complete
      MessageBus response =
          client.updateMessageBusAsync(messageBus, updateMask).get(3, TimeUnit.MINUTES);
      System.out.println("Updated Message Bus: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_messagebus_update]
