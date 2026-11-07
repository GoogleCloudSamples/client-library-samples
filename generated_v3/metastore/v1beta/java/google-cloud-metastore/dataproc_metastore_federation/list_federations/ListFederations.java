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

package com.google.cloud.metastore.v1beta;

// [START metastore_v1beta_dataprocmetastorefederation_federations_list]
import com.google.cloud.metastore.v1beta.DataprocMetastoreFederationClient;
import com.google.cloud.metastore.v1beta.Federation;
import com.google.cloud.metastore.v1beta.LocationName;
import java.io.IOException;

public class ListFederations {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    listFederations(locationId, projectId);
  }

  public static void listFederations(String locationId, String projectId) throws Exception {
    try (DataprocMetastoreFederationClient client = DataprocMetastoreFederationClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Federation federation : client.listFederations(parent).iterateAll()) {
        System.out.println("Federation: " + federation.getName());
      }
    }
  }
}
// [END metastore_v1beta_dataprocmetastorefederation_federations_list]
