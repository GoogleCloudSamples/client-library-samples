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

// [START serviceusage_v1_serviceusage_enable_service]

import (
	"context"
	"fmt"
	"io"
	"os"

	serviceusage "cloud.google.com/go/serviceusage/apiv1"
	serviceusagepb "cloud.google.com/go/serviceusage/apiv1/serviceusagepb"
)

// enableService enables a service on a project.
func enableService(ctx context.Context, w io.Writer) error {
	client, err := serviceusage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	serviceName := "compute.googleapis.com"
	req := &serviceusagepb.EnableServiceRequest{
		Name: fmt.Sprintf("projects/%s/services/%s", projectID, serviceName),
	}

	op, err := client.EnableService(ctx, req)
	if err != nil {
		return fmt.Errorf("EnableService: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Enabled service: %s\n", resp.GetService().GetName())
	return nil
}

// [END serviceusage_v1_serviceusage_enable_service]
