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

// [START datafusion_v1_datafusion_instance_get]

import (
	"context"
	"fmt"
	"io"

	datafusion "cloud.google.com/go/datafusion/apiv1"
	datafusionpb "cloud.google.com/go/datafusion/apiv1/datafusionpb"
)

// getInstance retrieves details of a Cloud Data Fusion instance.
func getInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	client, err := datafusion.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datafusionpb.GetInstanceRequest{
		Name: name,
	}

	instance, err := client.GetInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInstance failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved instance: %s\nState: %s\n", instance.GetName(), instance.GetState())
	return nil
}

// [END datafusion_v1_datafusion_instance_get]
