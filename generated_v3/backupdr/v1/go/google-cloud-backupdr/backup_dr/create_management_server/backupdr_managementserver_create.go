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

// [START backupdr_v1_backupdr_managementserver_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	"cloud.google.com/go/backupdr/apiv1/backupdrpb"
)

// createManagementServer creates a Backup and DR management server instance.
func createManagementServer(ctx context.Context, w io.Writer, projectID string, locationID string, managementServerID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	managementServer := &backupdrpb.ManagementServer{
		Type: backupdrpb.ManagementServer_BACKUP_RESTORE,
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.CreateManagementServerRequest{
		Parent:             parent,
		ManagementServerId: managementServerID,
		ManagementServer:   managementServer,
	}

	op, err := client.CreateManagementServer(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "already present") || strings.Contains(err.Error(), "MS_ALREADY_EXISTS") {
			fmt.Fprintf(w, "Management server already present in %s\n", parent)
			return nil
		}
		return fmt.Errorf("CreateManagementServer failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		// A project and location can contain only one management server of type BACKUP_RESTORE.
		if strings.Contains(err.Error(), "already present") || strings.Contains(err.Error(), "MS_ALREADY_EXISTS") {
			fmt.Fprintf(w, "Management server already present in %s\n", parent)
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Management server created: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1_backupdr_managementserver_create]
