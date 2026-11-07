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

// [START eventarc_v1_eventarc_trigger_create]
import com.google.cloud.eventarc.v1.CloudRun;
import com.google.cloud.eventarc.v1.Destination;
import com.google.cloud.eventarc.v1.EventFilter;
import com.google.cloud.eventarc.v1.EventarcClient;
import com.google.cloud.eventarc.v1.LocationName;
import com.google.cloud.eventarc.v1.Trigger;
import com.google.cloud.eventarc.v1.TriggerName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateTrigger {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String triggerId = "example-trigger-id";
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String serviceId = "example-service-id";
    createTrigger(triggerId, projectId, locationId, serviceId);
  }

  public static void createTrigger(
      String triggerId, String projectId, String locationId, String serviceId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (EventarcClient client = EventarcClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      CloudRun cloudRun =
          CloudRun.newBuilder()
              .setService(serviceId)
              .setRegion(locationId)
              .build();

      Destination destination =
          Destination.newBuilder()
              .setCloudRun(cloudRun)
              .build();

      EventFilter eventFilter =
          EventFilter.newBuilder()
              .setAttribute("type")
              .setValue("google.cloud.pubsub.topic.v1.messagePublished")
              .build();

      Trigger trigger =
          Trigger.newBuilder()
              .setName(TriggerName.of(projectId, locationId, triggerId).toString())
              .setDestination(destination)
              .addEventFilters(eventFilter)
              .build();

      Trigger response =
          client.createTriggerAsync(parent, trigger, triggerId).get(3, TimeUnit.MINUTES);
      System.out.println("Created trigger: " + response.getName());
    }
  }
}
// [END eventarc_v1_eventarc_trigger_create]
