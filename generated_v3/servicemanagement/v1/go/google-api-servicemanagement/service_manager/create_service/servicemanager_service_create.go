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

// [START servicemanagement_v1_servicemanager_service_create]

import (
	"context"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	"cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
)

// createService creates a new managed service using the Service Management API.
func createService(ctx context.Context, w io.Writer, projectID string, serviceID string) error {
	service := &servicemanagementpb.ManagedService{
		ServiceName:       serviceID,
		ProducerProjectId: projectID,
	}

	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.CreateServiceRequest{
		Service: service,
	}

	op, err := client.CreateService(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateService: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created service: %s\n", resp.GetServiceName())
	return nil
}

// [END servicemanagement_v1_servicemanager_service_create]
