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

// [START servicemanagement_v1_servicemanager_serviceconfig_create]

import (
	"context"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
	serviceconfig "google.golang.org/genproto/googleapis/api/serviceconfig"
)

// createServiceConfig creates a new configuration revision for a managed service.
func createServiceConfig(ctx context.Context, w io.Writer, serviceName string) error {
	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient failed: %w", err)
	}
	defer client.Close()

	// Retrieve the managed service to obtain its producer project ID.
	managedService, err := client.GetService(ctx, &servicemanagementpb.GetServiceRequest{
		ServiceName: serviceName,
	})
	if err != nil {
		return fmt.Errorf("GetService failed: %w", err)
	}

	serviceConfig := &serviceconfig.Service{
		Name:              serviceName,
		Title:             "Example Service Configuration",
		ProducerProjectId: managedService.GetProducerProjectId(),
	}

	req := &servicemanagementpb.CreateServiceConfigRequest{
		ServiceName:   serviceName,
		ServiceConfig: serviceConfig,
	}

	resp, err := client.CreateServiceConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateServiceConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Created service configuration ID: %s\n", resp.GetId())
	return nil
}

// [END servicemanagement_v1_servicemanager_serviceconfig_create]
