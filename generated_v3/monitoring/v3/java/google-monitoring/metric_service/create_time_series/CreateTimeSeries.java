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

// [START monitoring_v3_metricservice_timeseries_create]
import com.google.api.Metric;
import com.google.api.MetricDescriptor;
import com.google.api.MonitoredResource;
import com.google.cloud.monitoring.v3.MetricServiceClient;
import com.google.monitoring.v3.Point;
import com.google.monitoring.v3.TimeInterval;
import com.google.monitoring.v3.TimeSeries;
import com.google.monitoring.v3.TypedValue;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class CreateTimeSeries {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    createTimeSeries(projectId);
  }

  public static void createTimeSeries(String projectId) throws IOException {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name = "projects/" + projectId;

      long nowMillis = System.currentTimeMillis();
      Timestamp timestamp =
          Timestamp.newBuilder()
              .setSeconds(nowMillis / 1000)
              .setNanos((int) ((nowMillis % 1000) * 1_000_000))
              .build();

      TimeInterval interval = TimeInterval.newBuilder().setEndTime(timestamp).build();
      TypedValue value = TypedValue.newBuilder().setInt64Value(123L).build();
      Point point = Point.newBuilder().setInterval(interval).setValue(value).build();

      Metric metric =
          Metric.newBuilder().setType("custom.googleapis.com/sample_metric").build();
      MonitoredResource resource = MonitoredResource.newBuilder().setType("global").build();

      TimeSeries timeSeries =
          TimeSeries.newBuilder()
              .setMetric(metric)
              .setResource(resource)
              .setMetricKind(MetricDescriptor.MetricKind.GAUGE)
              .setValueType(MetricDescriptor.ValueType.INT64)
              .addPoints(point)
              .build();

      List<TimeSeries> timeSeriesList = Collections.singletonList(timeSeries);
      client.createTimeSeries(name, timeSeriesList);

      System.out.println("Created time series successfully for " + name);
    }
  }
}
// [END monitoring_v3_metricservice_timeseries_create]
