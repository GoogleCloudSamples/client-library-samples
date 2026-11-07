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

// [START monitoring_v2_metricservice_metricdescriptor_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	metricpb "google.golang.org/genproto/googleapis/api/metric"
)

// createMetricDescriptor creates a custom metric descriptor.
func createMetricDescriptor(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)
	metricDescriptor := &metricpb.MetricDescriptor{
		Type:        fmt.Sprintf("custom.googleapis.com/sample_metric_%d", time.Now().Unix()),
		MetricKind:  metricpb.MetricDescriptor_GAUGE,
		ValueType:   metricpb.MetricDescriptor_DOUBLE,
		Description: "A custom metric descriptor.",
		DisplayName: "Sample Metric",
	}

	client, err := monitoring.NewMetricClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.CreateMetricDescriptorRequest{
		Name:             name,
		MetricDescriptor: metricDescriptor,
	}

	resp, err := client.CreateMetricDescriptor(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateMetricDescriptor: %w", err)
	}

	fmt.Fprintf(w, "Created metric descriptor: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_metricservice_metricdescriptor_create]
