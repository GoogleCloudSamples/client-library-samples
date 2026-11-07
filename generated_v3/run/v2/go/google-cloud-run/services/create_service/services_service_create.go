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

// [START run_v2_services_service_create]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// createService creates a new Cloud Run service using the ServicesClient.
func createService(ctx context.Context, w io.Writer, projectID string, locationID string, serviceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	service := &runpb.Service{
		Template: &runpb.RevisionTemplate{
			Containers: []*runpb.Container{
				{
					Image: "us-docker.pkg.dev/cloudrun/container/hello",
				},
			},
		},
	}

	client, err := run.NewServicesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServicesClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.CreateServiceRequest{
		Parent:    parent,
		Service:   service,
		ServiceId: serviceID,
	}

	op, err := client.CreateService(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to start service creation: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("failed to complete service creation: %w", err)
	}

	fmt.Fprintf(w, "Created service: %s\n", resp.GetName())
	return nil
}

// [END run_v2_services_service_create]
