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

package com.google.cloud.run.v2;

// [START run_v2_revisions_revision_delete]
import com.google.cloud.run.v2.DeleteRevisionRequest;
import com.google.cloud.run.v2.Revision;
import com.google.cloud.run.v2.RevisionsClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteRevision {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceId = "example-service_id";
    String revisionId = "example-revision_id";
    deleteRevision(projectId, locationId, serviceId, revisionId);
  }

  public static void deleteRevision(
      String projectId, String locationId, String serviceId, String revisionId)
      throws Exception {
    try (RevisionsClient client = RevisionsClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/services/%s/revisions/%s",
              projectId, locationId, serviceId, revisionId);

      DeleteRevisionRequest request = DeleteRevisionRequest.newBuilder().setName(name).build();

      Revision revision = client.deleteRevisionAsync(request).get();
      System.out.println("Deleted revision: " + revision.getName());
    }
  }
}
// [END run_v2_revisions_revision_delete]
