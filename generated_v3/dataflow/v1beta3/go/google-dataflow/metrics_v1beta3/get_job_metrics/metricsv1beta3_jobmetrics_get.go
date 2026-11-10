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

// [START dataflow_v1beta3_metricsv1beta3_jobmetrics_get]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
)

// getJobMetrics retrieves runtime metrics for a specific Dataflow job.
func getJobMetrics(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	client, err := dataflow.NewMetricsV1Beta3Client(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricsV1Beta3Client failed: %w", err)
	}
	defer client.Close()

	req := &dataflowpb.GetJobMetricsRequest{
		ProjectId: projectID,
		Location:  locationID,
		JobId:     jobID,
	}

	resp, err := client.GetJobMetrics(ctx, req)
	if err != nil {
		return fmt.Errorf("GetJobMetrics: %w", err)
	}

	fmt.Fprintf(w, "Retrieved %d metrics for job %s\n", len(resp.GetMetrics()), jobID)
	for _, metric := range resp.GetMetrics() {
		fmt.Fprintf(w, "Metric: %s\n", metric.GetName().GetName())
	}

	return nil
}

// [END dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
