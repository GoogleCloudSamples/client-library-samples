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

// [START monitoring_v2_servicemonitoringservice_service_create]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// Use the CreateService method.
func createService(ctx context.Context, w io.Writer, serviceID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	service := &monitoringpb.Service{
		DisplayName: "Example Custom Service",
		Identifier: &monitoringpb.Service_Custom_{
			Custom: &monitoringpb.Service_Custom{},
		},
	}

	client, err := monitoring.NewServiceMonitoringClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceMonitoringClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.CreateServiceRequest{
		Parent:    parent,
		ServiceId: serviceID,
		Service:   service,
	}

	resp, err := client.CreateService(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateService: %w", err)
	}

	fmt.Fprintf(w, "Created service: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_servicemonitoringservice_service_create]
