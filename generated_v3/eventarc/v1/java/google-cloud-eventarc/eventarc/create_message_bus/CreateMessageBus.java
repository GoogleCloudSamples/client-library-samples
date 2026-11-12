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

// [START eventarc_v1_eventarc_messagebus_create]
import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.LocationName;
import com.google.cloud.eventarc.v1.MessageBus;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateMessageBus {

  public static void main(String[] args) throws Exception {
    String messageBusId = "example-message-bus";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createMessageBus(messageBusId, projectId, locationId);
  }

  public static void createMessageBus(String messageBusId, String projectId, String locationId)
      throws Exception {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      MessageBus messageBus = MessageBus.newBuilder().build();

      try {
        MessageBus response = client.createMessageBusAsync(parent, messageBus, messageBusId).get();
        System.out.println("Created message bus: " + response.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ResourceExhaustedException) {
          System.out.println("Quota limit reached for message buses in region: " + locationId);
        } else if (e.getCause() instanceof AlreadyExistsException) {
          System.out.println("Message bus already exists: " + messageBusId);
        } else {
          throw e;
        }
      }
    }
  }
}
// [END eventarc_v1_eventarc_messagebus_create]
