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

// [START netapp_v1_netapp_activedirectory_create]

import (
	"context"
	"fmt"
	"io"
	"os"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
)

// createActiveDirectory creates an Active Directory config in Google Cloud NetApp Volumes.
func createActiveDirectory(ctx context.Context, w io.Writer, activeDirectoryID string) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
	activeDirectory := &netapppb.ActiveDirectory{
		Domain:        "example.com",
		Dns:           "10.0.0.1",
		NetBiosPrefix: "EXAMPLE",
		Username:      "administrator",
		Password:      "example-password",
	}

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.CreateActiveDirectoryRequest{
		Parent:            parent,
		ActiveDirectory:   activeDirectory,
		ActiveDirectoryId: activeDirectoryID,
	}

	op, err := client.CreateActiveDirectory(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateActiveDirectory failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation to complete failed: %w", err)
	}

	fmt.Fprintf(w, "Created Active Directory: %s\n", resp.GetName())
	return nil
}

// [END netapp_v1_netapp_activedirectory_create]
