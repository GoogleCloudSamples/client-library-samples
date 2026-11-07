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

package com.google.cloud.discoveryengine.v1beta;

// [START discoveryengine_v1beta_samplequeryservice_import_sample_queries]
import com.google.cloud.discoveryengine.v1beta.ImportSampleQueriesRequest;
import com.google.cloud.discoveryengine.v1beta.ImportSampleQueriesResponse;
import com.google.cloud.discoveryengine.v1beta.SampleQuery;
import com.google.cloud.discoveryengine.v1beta.SampleQueryServiceClient;
import com.google.cloud.discoveryengine.v1beta.SampleQuerySetName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ImportSampleQueries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sampleQuerySetId = "example-sample_query_set_id";
    importSampleQueries(projectId, locationId, sampleQuerySetId);
  }

  public static void importSampleQueries(
      String projectId, String locationId, String sampleQuerySetId) throws Exception {
    try (SampleQueryServiceClient client = SampleQueryServiceClient.create()) {
      String parent =
          SampleQuerySetName.of(projectId, locationId, sampleQuerySetId).toString();

      ImportSampleQueriesRequest.InlineSource inlineSource =
          ImportSampleQueriesRequest.InlineSource.newBuilder()
              .addSampleQueries(
                  SampleQuery.newBuilder()
                      .setQueryEntry(
                          SampleQuery.QueryEntry.newBuilder()
                              .setQuery("example query")
                              .build())
                      .build())
              .build();

      ImportSampleQueriesRequest request =
          ImportSampleQueriesRequest.newBuilder()
              .setParent(parent)
              .setInlineSource(inlineSource)
              .build();

      // Blocks until the long-running operation reaches completion.
      ImportSampleQueriesResponse response =
          client.importSampleQueriesAsync(request).get(5, TimeUnit.MINUTES);

      System.out.printf("Imported sample queries successfully: %s%n", response);
    }
  }
}
// [END discoveryengine_v1beta_samplequeryservice_import_sample_queries]
