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

// [START servicemanagement_v1_servicemanager_service_get]

import (
	"context"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
)

// getService retrieves metadata for an existing managed service.
func getService(ctx context.Context, w io.Writer, serviceName string) error {
	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.GetServiceRequest{
		ServiceName: serviceName,
	}

	service, err := client.GetService(ctx, req)
	if err != nil {
		return fmt.Errorf("GetService failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved service: %s\n", service.GetServiceName())
	fmt.Fprintf(w, "Producer project ID: %s\n", service.GetProducerProjectId())
	return nil
}

// [END servicemanagement_v1_servicemanager_service_get]
