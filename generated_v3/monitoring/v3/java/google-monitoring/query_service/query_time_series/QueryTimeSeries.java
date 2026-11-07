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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_queryservice_query_time_series]
import com.google.cloud.monitoring.v3.QueryServiceClient;
import com.google.monitoring.v3.QueryTimeSeriesRequest;
import com.google.monitoring.v3.TimeSeriesData;

public class QueryTimeSeries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    queryTimeSeries(projectId);
  }

  public static void queryTimeSeries(String projectId) throws Exception {
    try (QueryServiceClient client = QueryServiceClient.create()) {
      // The QueryTimeSeries method and Monitoring Query Language (MQL) are deprecated in favor of PromQL.
      String name = String.format("projects/%s", projectId);
      String query = "fetch gce_instance::compute.googleapis.com/instance/cpu/utilization | within 5m";

      QueryTimeSeriesRequest request =
          QueryTimeSeriesRequest.newBuilder()
              .setName(name)
              .setQuery(query)
              .build();

      for (TimeSeriesData timeSeriesData : client.queryTimeSeries(request).iterateAll()) {
        System.out.println("Time series data: " + timeSeriesData);
      }
    }
  }
}
// [END monitoring_v3_queryservice_query_time_series]
