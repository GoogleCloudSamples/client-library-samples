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

// [START backupdr_v1_backupdr_initialize_service]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
)

// initializeService initializes the service configuration for the specified resource type.
func initializeService(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	resourceType := "compute.googleapis.com/Instance"
	name := fmt.Sprintf("projects/%s/locations/%s/serviceConfig", projectID, locationID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.InitializeServiceRequest{
		Name:         name,
		ResourceType: resourceType,
	}

	op, err := client.InitializeService(ctx, req)
	if err != nil {
		return fmt.Errorf("InitializeService failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Service initialized: %v\n", resp)
	return nil
}

// [END backupdr_v1_backupdr_initialize_service]
