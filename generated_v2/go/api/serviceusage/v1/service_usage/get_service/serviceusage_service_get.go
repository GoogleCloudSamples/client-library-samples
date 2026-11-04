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

// [START serviceusage_v1_serviceusage_service_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	serviceusage "cloud.google.com/go/serviceusage/apiv1"
	serviceusagepb "cloud.google.com/go/serviceusage/apiv1/serviceusagepb"
)

// getService retrieves information about a specific service for a project.
func getService(ctx context.Context, w io.Writer) error {
	client, err := serviceusage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("serviceusage.NewClient: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable is not set")
	}

	serviceName := "compute.googleapis.com"

	req := &serviceusagepb.GetServiceRequest{
		Name: fmt.Sprintf("projects/%s/services/%s", projectID, serviceName),
	}

	resp, err := client.GetService(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetService: %w", err)
	}

	fmt.Fprintf(w, "Service: %s\n", resp.GetName())
	fmt.Fprintf(w, "State: %s\n", resp.GetState())

	return nil
}

// [END serviceusage_v1_serviceusage_service_get]
