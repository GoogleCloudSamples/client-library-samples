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

// [START retail_v2alpha_analyticsservice_export_analytics_metrics]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	"cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// exportAnalyticsMetrics exports analytics metrics from a Retail catalog to Cloud Storage.
func exportAnalyticsMetrics(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	catalog := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	gcsDestination := &retailpb.OutputConfig_GcsDestination{
		OutputUriPrefix: "gs://example-bucket/analytics_export_",
	}
	outputConfig := &retailpb.OutputConfig{
		Destination: &retailpb.OutputConfig_GcsDestination_{
			GcsDestination: gcsDestination,
		},
	}

	client, err := retail.NewAnalyticsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAnalyticsClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.ExportAnalyticsMetricsRequest{
		Catalog:      catalog,
		OutputConfig: outputConfig,
	}

	// ExportAnalyticsMetrics initiates a long-running operation.
	op, err := client.ExportAnalyticsMetrics(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintln(w, "Export analytics metrics completed.")
			return nil
		}
		return fmt.Errorf("ExportAnalyticsMetrics failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintln(w, "Export analytics metrics completed.")
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Export analytics metrics completed: %v\n", resp)
	return nil
}

// [END retail_v2alpha_analyticsservice_export_analytics_metrics]
