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

package com.google.cloud.retail.v2;

// [START retail_v2_usereventservice_rejoin_user_events]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2.CatalogName;
import com.google.cloud.retail.v2.RejoinUserEventsMetadata;
import com.google.cloud.retail.v2.RejoinUserEventsRequest;
import com.google.cloud.retail.v2.RejoinUserEventsResponse;
import com.google.cloud.retail.v2.UserEventServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class RejoinUserEvents {

  public static void main(String[] args) throws IOException {
    String projectId = args.length > 0 ? args[0] : "example-project-id";
    String locationId = args.length > 1 ? args[1] : "global";
    String catalogId = args.length > 2 ? args[2] : "default_catalog";
    rejoinUserEvents(projectId, locationId, catalogId);
  }

  public static void rejoinUserEvents(String projectId, String locationId, String catalogId)
      throws IOException {
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      String parent = CatalogName.of(projectId, locationId, catalogId).toString();
      RejoinUserEventsRequest.UserEventRejoinScope userEventRejoinScope =
          RejoinUserEventsRequest.UserEventRejoinScope.UNJOINED_EVENTS;

      RejoinUserEventsRequest request =
          RejoinUserEventsRequest.newBuilder()
              .setParent(parent)
              .setUserEventRejoinScope(userEventRejoinScope)
              .build();

      // Rejoin user events is a long-running operation.
      OperationFuture<RejoinUserEventsResponse, RejoinUserEventsMetadata> future =
          client.rejoinUserEventsAsync(request);

      try {
        RejoinUserEventsResponse response = future.get(5, TimeUnit.MINUTES);
        System.out.printf(
            "Rejoined user events count: %d%n", response.getRejoinedUserEventsCount());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException) {
          System.out.println("Rejoined user events count: 0");
        } else {
          System.out.printf("Operation could not be completed: %s%n", e.getMessage());
        }
      } catch (InterruptedException e) {
        System.out.println("Operation was interrupted.");
        Thread.currentThread().interrupt();
      } catch (TimeoutException e) {
        System.out.println("Operation timed out waiting for completion.");
      }
    } catch (FailedPreconditionException e) {
      System.out.println("Rejoined user events count: 0");
    }
  }
}
// [END retail_v2_usereventservice_rejoin_user_events]
