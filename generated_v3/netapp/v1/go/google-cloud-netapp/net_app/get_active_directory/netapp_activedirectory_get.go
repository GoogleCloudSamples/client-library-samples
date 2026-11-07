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

// [START netapp_v1_netapp_activedirectory_get]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
)

// getActiveDirectory retrieves details of an existing Active Directory resource.
func getActiveDirectory(ctx context.Context, w io.Writer, projectID string, locationID string, activeDirectoryID string) error {
	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/activeDirectories/%s", projectID, locationID, activeDirectoryID)

	req := &netapppb.GetActiveDirectoryRequest{
		Name: name,
	}

	ad, err := client.GetActiveDirectory(ctx, req)
	if err != nil {
		return fmt.Errorf("GetActiveDirectory failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Active Directory: %s\n", ad.GetName())

	return nil
}

// [END netapp_v1_netapp_activedirectory_get]
