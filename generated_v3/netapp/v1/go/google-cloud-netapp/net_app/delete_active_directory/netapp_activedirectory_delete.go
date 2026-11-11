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

// [START netapp_v1_netapp_activedirectory_delete]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
)

// deleteActiveDirectory deletes an Active Directory resource.
func deleteActiveDirectory(ctx context.Context, w io.Writer, projectID string, locationID string, activeDirectoryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/activeDirectories/%s", projectID, locationID, activeDirectoryID)

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.DeleteActiveDirectoryRequest{
		Name: name,
	}

	op, err := client.DeleteActiveDirectory(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteActiveDirectory failed: %w", err)
	}

	// DeleteActiveDirectory is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted Active Directory: %s\n", name)
	return nil
}

// [END netapp_v1_netapp_activedirectory_delete]
