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

// [START networkservices_v1_networkservices_mesh_delete]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// Use the DeleteMesh method.
func deleteMesh(ctx context.Context, w io.Writer, projectID string, locationID string, meshID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/meshes/%s", projectID, locationID, meshID)

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.DeleteMeshRequest{
		Name: name,
	}

	op, err := client.DeleteMesh(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteMesh failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted mesh: %s\n", name)

	return nil
}

// [END networkservices_v1_networkservices_mesh_delete]
