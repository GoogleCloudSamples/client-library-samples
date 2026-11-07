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

// [START servicemanagement_v1_servicemanager_generate_config_report]

import (
	"context"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
	serviceconfig "google.golang.org/genproto/googleapis/api/serviceconfig"
	"google.golang.org/protobuf/types/known/anypb"
)

// generateConfigReport generates a diagnostic report for a service configuration.
func generateConfigReport(ctx context.Context, w io.Writer) error {
	newConfig, err := anypb.New(&serviceconfig.Service{
		Name:  "example.endpoints.example-project-id.cloud.goog",
		Title: "Example Service",
	})
	if err != nil {
		return fmt.Errorf("anypb.New failed: %w", err)
	}

	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.GenerateConfigReportRequest{
		NewConfig: newConfig,
	}

	resp, err := client.GenerateConfigReport(ctx, req)
	if err != nil {
		return fmt.Errorf("GenerateConfigReport failed: %w", err)
	}

	fmt.Fprintf(w, "Generated config report ID: %s\n", resp.GetId())
	fmt.Fprintf(w, "Service name: %s\n", resp.GetServiceName())
	fmt.Fprintf(w, "Change reports count: %d\n", len(resp.GetChangeReports()))
	fmt.Fprintf(w, "Diagnostics count: %d\n", len(resp.GetDiagnostics()))

	return nil
}

// [END servicemanagement_v1_servicemanager_generate_config_report]
