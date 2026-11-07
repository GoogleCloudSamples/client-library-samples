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

// [START memorystore_v1_memorystore_instance_get]

import (
	"context"
	"fmt"
	"io"

	memorystore "cloud.google.com/go/memorystore/apiv1beta"
	memorystorepb "cloud.google.com/go/memorystore/apiv1beta/memorystorepb"
)

// Use the GetInstance method.
func getInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	client, err := memorystore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("memorystore.NewClient: %w", err)
	}
	defer client.Close()

	req := &memorystorepb.GetInstanceRequest{
		Name: name,
	}

	resp, err := client.GetInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInstance: %w", err)
	}

	fmt.Fprintf(w, "Retrieved instance: %s\n", resp.GetName())

	return nil
}

// [END memorystore_v1_memorystore_instance_get]
