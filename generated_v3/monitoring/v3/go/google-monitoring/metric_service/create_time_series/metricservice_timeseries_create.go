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

package main

// [START monitoring_v2_metricservice_timeseries_create]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	metricpb "google.golang.org/genproto/googleapis/api/metric"
	monitoredrespb "google.golang.org/genproto/googleapis/api/monitoredres"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// createTimeSeries writes a custom metric data point to Cloud Monitoring.
func createTimeSeries(ctx context.Context, w io.Writer, projectID string) error {
	client, err := monitoring.NewMetricClient(ctx)
	if err != nil {
		return fmt.Errorf("monitoring.NewMetricClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s", projectID)

	point := &monitoringpb.Point{
		Interval: &monitoringpb.TimeInterval{
			EndTime: timestamppb.Now(),
		},
		Value: &monitoringpb.TypedValue{
			Value: &monitoringpb.TypedValue_Int64Value{
				Int64Value: 42,
			},
		},
	}

	series := &monitoringpb.TimeSeries{
		Metric: &metricpb.Metric{
			Type: "custom.googleapis.com/sample_metric",
		},
		Resource: &monitoredrespb.MonitoredResource{
			Type: "global",
			Labels: map[string]string{
				"project_id": projectID,
			},
		},
		Points: []*monitoringpb.Point{point},
	}

	timeSeries := []*monitoringpb.TimeSeries{series}

	req := &monitoringpb.CreateTimeSeriesRequest{
		Name:       name,
		TimeSeries: timeSeries,
	}

	if err := client.CreateTimeSeries(ctx, req); err != nil {
		return fmt.Errorf("CreateTimeSeries: %w", err)
	}

	fmt.Fprintf(w, "Successfully wrote time series to %s\n", name)
	return nil
}

// [END monitoring_v2_metricservice_timeseries_create]
