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

// [START monitoring_v2_metricservice_timeseries_list]

import (
	"context"
	"fmt"
	"io"
	"time"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/api/iterator"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// listTimeSeries retrieves metric time series data for the specified project.
func listTimeSeries(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)
	filter := `metric.type = "compute.googleapis.com/instance/cpu/utilization"`

	now := time.Now()
	interval := &monitoringpb.TimeInterval{
		StartTime: timestamppb.New(now.Add(-20 * time.Minute)),
		EndTime:   timestamppb.New(now),
	}
	view := monitoringpb.ListTimeSeriesRequest_FULL

	client, err := monitoring.NewMetricClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.ListTimeSeriesRequest{
		Name:     name,
		Filter:   filter,
		Interval: interval,
		View:     view,
	}

	it := client.ListTimeSeries(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Time series metric: %s, points: %d\n", resp.GetMetric().GetType(), len(resp.GetPoints()))
	}

	return nil
}

// [END monitoring_v2_metricservice_timeseries_list]
