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

// [START monitoring_v2_metricservice_metricdescriptor_get]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// getMetricDescriptor retrieves a Cloud Monitoring metric descriptor.
func getMetricDescriptor(ctx context.Context, w io.Writer, metricDescriptorID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/metricDescriptors/%s", projectID, metricDescriptorID)

	client, err := monitoring.NewMetricClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.GetMetricDescriptorRequest{
		Name: name,
	}

	descriptor, err := client.GetMetricDescriptor(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMetricDescriptor failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved metric descriptor: %s\n", descriptor.GetName())
	fmt.Fprintf(w, "Type: %s\n", descriptor.GetType())
	fmt.Fprintf(w, "Metric kind: %s\n", descriptor.GetMetricKind())
	fmt.Fprintf(w, "Value type: %s\n", descriptor.GetValueType())
	fmt.Fprintf(w, "Description: %s\n", descriptor.GetDescription())

	return nil
}

// [END monitoring_v2_metricservice_metricdescriptor_get]
