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

// [START monitoring_v2_metricservice_monitoredresourcedescriptor_get]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// getMonitoredResourceDescriptor retrieves a monitored resource descriptor.
func getMonitoredResourceDescriptor(ctx context.Context, w io.Writer, monitoredResourceDescriptorID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/monitoredResourceDescriptors/%s", projectID, monitoredResourceDescriptorID)

	client, err := monitoring.NewMetricClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.GetMonitoredResourceDescriptorRequest{
		Name: name,
	}

	descriptor, err := client.GetMonitoredResourceDescriptor(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMonitoredResourceDescriptor: %w", err)
	}

	fmt.Fprintf(w, "Descriptor name: %s\n", descriptor.GetName())
	fmt.Fprintf(w, "Type: %s\n", descriptor.GetType())
	fmt.Fprintf(w, "Display name: %s\n", descriptor.GetDisplayName())
	fmt.Fprintf(w, "Description: %s\n", descriptor.GetDescription())

	return nil
}

// [END monitoring_v2_metricservice_monitoredresourcedescriptor_get]
