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

// [START run_v2_revisions_revision_get]
import com.google.cloud.run.v2.Revision;
import com.google.cloud.run.v2.RevisionName;
import com.google.cloud.run.v2.RevisionsClient;

public class GetRevision {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String serviceId = "example-service-id";
    String revisionId = "example-revision-id";
    getRevision(projectId, locationId, serviceId, revisionId);
  }

  public static void getRevision(
      String projectId, String locationId, String serviceId, String revisionId) throws Exception {
    try (RevisionsClient client = RevisionsClient.create()) {
      String name = RevisionName.of(projectId, locationId, serviceId, revisionId).toString();
      Revision revision = client.getRevision(name);
      System.out.println("Revision: " + revision.getName());
    }
  }
}
// [END run_v2_revisions_revision_get]
