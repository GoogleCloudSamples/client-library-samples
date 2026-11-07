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

package com.google.cloud.retail.v2alpha;

// [START retail_v2alpha_usereventservice_import_user_events]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2alpha.CatalogName;
import com.google.cloud.retail.v2alpha.ImportUserEventsRequest;
import com.google.cloud.retail.v2alpha.ImportUserEventsResponse;
import com.google.cloud.retail.v2alpha.UserEvent;
import com.google.cloud.retail.v2alpha.UserEventInlineSource;
import com.google.cloud.retail.v2alpha.UserEventInputConfig;
import com.google.cloud.retail.v2alpha.UserEventServiceClient;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.time.Instant;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ImportUserEvents {

  public static void main(String[] args) throws Exception {
    String projectId = args.length > 0 ? args[0] : "example-project-id";
    String locationId = args.length > 1 ? args[1] : "global";
    String catalogId = args.length > 2 ? args[2] : "default_catalog";
    importUserEvents(projectId, locationId, catalogId);
  }

  public static void importUserEvents(String projectId, String locationId, String catalogId)
      throws Exception {
    try (UserEventServiceClient client = UserEventServiceClient.create()) {
      String parent = CatalogName.of(projectId, locationId, catalogId).toString();

      Instant instant = Instant.now();
      Timestamp eventTime =
          Timestamp.newBuilder()
              .setSeconds(instant.getEpochSecond())
              .setNanos(instant.getNano())
              .build();

      UserEvent userEvent =
          UserEvent.newBuilder()
              .setEventType("detail-page-view")
              .setVisitorId("example-visitor-id")
              .setEventTime(eventTime)
              .build();

      UserEventInlineSource inlineSource =
          UserEventInlineSource.newBuilder()
              .addUserEvents(userEvent)
              .build();

      // Errors config is omitted because it is unsupported for inline imports.
      UserEventInputConfig inputConfig =
          UserEventInputConfig.newBuilder()
              .setUserEventInlineSource(inlineSource)
              .build();

      ImportUserEventsRequest request =
          ImportUserEventsRequest.newBuilder()
              .setParent(parent)
              .setInputConfig(inputConfig)
              .build();

      try {
        ImportUserEventsResponse response =
            client.importUserEventsAsync(request).get(5, TimeUnit.MINUTES);

        System.out.println("Import user events operation completed.");
        if (response.hasImportSummary()) {
          System.out.printf(
              "Joined events: %d, unjoined events: %d%n",
              response.getImportSummary().getJoinedEventsCount(),
              response.getImportSummary().getUnjoinedEventsCount());
        }
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException) {
          System.out.println("Import user events operation completed.");
        } else {
          throw e;
        }
      } catch (FailedPreconditionException e) {
        System.out.println("Import user events operation completed.");
      }
    }
  }
}
// [END retail_v2alpha_usereventservice_import_user_events]
