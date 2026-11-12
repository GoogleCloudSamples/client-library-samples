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

// [START monitoring_v2_servicemonitoringservice_service_update]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateService updates the display name of an existing Cloud Monitoring service.
func updateService(ctx context.Context, w io.Writer, projectID string, serviceID string) error {
	service := &monitoringpb.Service{
		Name:        fmt.Sprintf("projects/%s/services/%s", projectID, serviceID),
		DisplayName: "Updated Service Display Name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := monitoring.NewServiceMonitoringClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceMonitoringClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.UpdateServiceRequest{
		Service:    service,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateService(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateService failed: %w", err)
	}

	fmt.Fprintf(w, "Updated service: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_servicemonitoringservice_service_update]
