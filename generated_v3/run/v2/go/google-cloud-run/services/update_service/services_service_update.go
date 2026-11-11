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

// [START run_v2_services_service_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateService updates the description of a Cloud Run service.
func updateService(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("GOOGLE_CLOUD_REGION")
	if location == "" {
		location = os.Getenv("LOCATION")
	}
	if location == "" {
		location = os.Getenv("REGION")
	}
	if location == "" {
		location = "us-central1"
	}

	serviceID := os.Getenv("CLOUD_RUN_SERVICE")
	if serviceID == "" {
		serviceID = os.Getenv("SERVICE_NAME")
	}
	if serviceID == "" {
		serviceID = os.Getenv("SERVICE")
	}
	if serviceID == "" {
		serviceID = os.Getenv("SERVICE_ID")
	}
	if serviceID == "" {
		serviceID = "example-service"
	}

	service := &runpb.Service{
		Name:        fmt.Sprintf("projects/%s/locations/%s/services/%s", projectID, location, serviceID),
		Description: "Updated service description",
	}

	client, err := run.NewServicesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServicesClient: %w", err)
	}
	defer client.Close()

	req := &runpb.UpdateServiceRequest{
		Service: service,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"description"},
		},
	}

	op, err := client.UpdateService(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateService: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated service: %s\n", resp.GetName())
	return nil
}

// [END run_v2_services_service_update]
