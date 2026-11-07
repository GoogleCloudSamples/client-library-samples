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

package com.google.cloud.contactcenterinsights.v1;

// [START contactcenterinsights_v1_contactcenterinsights_tune_qa_scorecard_revision]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.QaScorecardRevisionName;
import com.google.cloud.contactcenterinsights.v1.TuneQaScorecardRevisionMetadata;
import com.google.cloud.contactcenterinsights.v1.TuneQaScorecardRevisionRequest;
import com.google.cloud.contactcenterinsights.v1.TuneQaScorecardRevisionResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class TuneQaScorecardRevision {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String qaScorecardId = "example-qa-scorecard-id";
    String revisionId = "example-revision-id";
    String filter = "example-filter";
    tuneQaScorecardRevision(projectId, locationId, qaScorecardId, revisionId, filter);
  }

  public static void tuneQaScorecardRevision(
      String projectId,
      String locationId,
      String qaScorecardId,
      String revisionId,
      String filter)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent =
          QaScorecardRevisionName.of(projectId, locationId, qaScorecardId, revisionId).toString();

      TuneQaScorecardRevisionRequest request =
          TuneQaScorecardRevisionRequest.newBuilder()
              .setParent(parent)
              .setFilter(filter)
              .build();

      // TuneQaScorecardRevision is a long-running operation; wait for it to complete.
      OperationFuture<TuneQaScorecardRevisionResponse, TuneQaScorecardRevisionMetadata>
          operationFuture = client.tuneQaScorecardRevisionAsync(request);
      try {
        operationFuture.get(1, TimeUnit.HOURS);
      } catch (ExecutionException e) {
        // The service can return an empty response payload when the operation succeeds.
        if (e.getCause() instanceof ApiException
            && e.getCause().getMessage().contains("succeeded")) {
          System.out.println("Tuned QA scorecard revision: " + parent);
          return;
        }
        throw e;
      }

      System.out.println("Tuned QA scorecard revision: " + parent);
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_tune_qa_scorecard_revision]
