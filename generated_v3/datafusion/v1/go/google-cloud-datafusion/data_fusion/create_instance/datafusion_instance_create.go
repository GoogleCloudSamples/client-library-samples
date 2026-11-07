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

// [START datafusion_v1_datafusion_instance_create]

import (
	"context"
	"fmt"
	"io"

	datafusion "cloud.google.com/go/datafusion/apiv1"
	datafusionpb "cloud.google.com/go/datafusion/apiv1/datafusionpb"
)

// createInstance starts the creation of a Cloud Data Fusion instance.
func createInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datafusion.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &datafusionpb.CreateInstanceRequest{
		Parent:     parent,
		InstanceId: instanceID,
		Instance: &datafusionpb.Instance{
			Type: datafusionpb.Instance_BASIC,
		},
	}

	op, err := client.CreateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateInstance: %w", err)
	}

	// Cloud Data Fusion instance creation typically takes over 15 minutes.
	// Return the operation name rather than blocking on op.Wait, which exceeds test timeouts.
	fmt.Fprintf(w, "Create instance operation started: %s\n", op.Name())
	return nil
}

// [END datafusion_v1_datafusion_instance_create]
