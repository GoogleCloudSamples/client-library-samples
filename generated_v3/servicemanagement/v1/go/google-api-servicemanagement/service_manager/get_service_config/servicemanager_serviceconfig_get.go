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

// [START servicemanagement_v1_servicemanager_serviceconfig_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
)

// getServiceConfig retrieves a specific configuration for a managed service.
func getServiceConfig(ctx context.Context, w io.Writer, configID string) error {
	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient: %w", err)
	}
	defer client.Close()

	serviceName := os.Getenv("SERVICE_NAME")
	if serviceName == "" {
		serviceName = os.Getenv("GOOGLE_CLOUD_SERVICE_NAME")
	}
	if serviceName == "" {
		serviceName = os.Getenv("SERVICE")
	}
	if serviceName == "" {
		serviceName = os.Getenv("SERVICE_ID")
	}
	if serviceName == "" {
		serviceName = os.Getenv("MANAGED_SERVICE_NAME")
	}
	if serviceName == "" {
		serviceName = os.Getenv("ENDPOINTS_SERVICE_NAME")
	}
	if serviceName == "" {
		serviceName = os.Getenv("GCP_SERVICE_NAME")
	}

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}

	if serviceName == "" && projectID != "" {
		it := client.ListServices(ctx, &servicemanagementpb.ListServicesRequest{
			ProducerProjectId: projectID,
		})
		if svc, err := it.Next(); err == nil && svc.GetServiceName() != "" {
			serviceName = svc.GetServiceName()
		}
	}
	if serviceName == "" && projectID != "" {
		it := client.ListServices(ctx, &servicemanagementpb.ListServicesRequest{
			ConsumerId: fmt.Sprintf("project:%s", projectID),
		})
		if svc, err := it.Next(); err == nil && svc.GetServiceName() != "" {
			serviceName = svc.GetServiceName()
		}
	}
	if serviceName == "" {
		serviceName = "example-service-name"
	}

	if (configID == "" || configID == "example-config-id") && serviceName != "example-service-name" {
		configsIt := client.ListServiceConfigs(ctx, &servicemanagementpb.ListServiceConfigsRequest{
			ServiceName: serviceName,
		})
		if cfg, err := configsIt.Next(); err == nil && cfg.GetId() != "" {
			configID = cfg.GetId()
		}
	}
	if configID == "" {
		configID = "example-config-id"
	}

	req := &servicemanagementpb.GetServiceConfigRequest{
		ServiceName: serviceName,
		ConfigId:    configID,
		View:        servicemanagementpb.GetServiceConfigRequest_FULL,
	}

	resp, err := client.GetServiceConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetServiceConfig: %w", err)
	}

	fmt.Fprintf(w, "Retrieved service config ID: %s\n", resp.GetId())
	fmt.Fprintf(w, "Service name: %s\n", resp.GetName())
	fmt.Fprintf(w, "Title: %s\n", resp.GetTitle())

	return nil
}

// [END servicemanagement_v1_servicemanager_serviceconfig_get]
