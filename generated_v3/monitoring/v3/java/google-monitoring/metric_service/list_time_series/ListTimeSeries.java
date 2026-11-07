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

// [START monitoring_v3_metricservice_timeseries_list]
import com.google.cloud.monitoring.v3.MetricServiceClient;
import com.google.monitoring.v3.ListTimeSeriesRequest;
import com.google.monitoring.v3.ListTimeSeriesRequest.TimeSeriesView;
import com.google.monitoring.v3.TimeInterval;
import com.google.monitoring.v3.TimeSeries;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class ListTimeSeries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listTimeSeries(projectId);
  }

  public static void listTimeSeries(String projectId) throws Exception {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name = "projects/" + projectId;
      String filter = "metric.type=\"compute.googleapis.com/instance/cpu/utilization\"";
      TimeSeriesView view = TimeSeriesView.FULL;

      // Construct a time window covering the past hour
      long nowMillis = System.currentTimeMillis();
      Timestamp endTime = Timestamp.newBuilder().setSeconds(nowMillis / 1000).build();
      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds((nowMillis - TimeUnit.HOURS.toMillis(1)) / 1000)
              .build();
      TimeInterval interval =
          TimeInterval.newBuilder().setStartTime(startTime).setEndTime(endTime).build();

      ListTimeSeriesRequest request =
          ListTimeSeriesRequest.newBuilder()
              .setName(name)
              .setFilter(filter)
              .setView(view)
              .setInterval(interval)
              .build();

      for (TimeSeries timeSeries : client.listTimeSeries(request).iterateAll()) {
        System.out.println("Metric: " + timeSeries.getMetric().getType());
        System.out.println("Data points: " + timeSeries.getPointsCount());
      }
    }
  }
}
// [END monitoring_v3_metricservice_timeseries_list]
