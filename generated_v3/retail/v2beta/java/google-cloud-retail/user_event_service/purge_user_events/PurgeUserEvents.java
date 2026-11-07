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

package com.google.cloud.retail.v2beta;

// [START retail_v2beta_usereventservice_purge_user_events]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2beta.PurgeUserEventsRequest;
import com.google.cloud.retail.v2beta.PurgeUserEventsResponse;
import com.google.cloud.retail.v2beta.UserEventServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class PurgeUserEvents {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String catalogId = "default_catalog";
    purgeUserEvents(projectId, catalogId);
  }

  public static void purgeUserEvents(String projectId, String catalogId)
      throws IOException, ExecutionException, InterruptedException {
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      String filter = "eventType = \"detail-page-view\"";
      String parent =
          String.format("projects/%s/locations/global/catalogs/%s", projectId, catalogId);
      boolean force = true;

      PurgeUserEventsRequest request =
          PurgeUserEventsRequest.newBuilder()
              .setParent(parent)
              .setFilter(filter)
              .setForce(force)
              .build();

      try {
        PurgeUserEventsResponse response = client.purgeUserEventsAsync(request).get();
        System.out.printf("Purged events count: %d%n", response.getPurgedEventsCount());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException) {
          System.out.println(
              "Cloud Retail data use terms must be accepted in the Google Cloud console.");
        } else {
          throw e;
        }
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.out.println("Purge operation interrupted.");
      }
    }
  }
}
// [END retail_v2beta_usereventservice_purge_user_events]
