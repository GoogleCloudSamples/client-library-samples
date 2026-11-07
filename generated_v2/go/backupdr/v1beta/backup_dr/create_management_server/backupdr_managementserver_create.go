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

// [START backupdr_v1beta_backupdr_managementserver_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	"cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createManagementServer creates a Backup and DR management server instance.
func createManagementServer(ctx context.Context, w io.Writer, projectID string, locationID string, managementServerID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	managementServer := &backupdrpb.ManagementServer{
		Type: backupdrpb.ManagementServer_BACKUP_RESTORE,
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.CreateManagementServerRequest{
		Parent:             parent,
		ManagementServerId: managementServerID,
		ManagementServer:   managementServer,
	}

	op, err := client.CreateManagementServer(ctx, req)
	if err != nil && isAlreadyExists(err) {
		return handleExistingServer(ctx, client, parent, w)
	}
	if err != nil {
		return fmt.Errorf("CreateManagementServer: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil && isAlreadyExists(err) {
		return handleExistingServer(ctx, client, parent, w)
	}
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created Management Server: %s\n", resp.GetName())

	return nil
}

func isAlreadyExists(err error) bool {
	c := status.Code(err)
	return c == codes.FailedPrecondition ||
		c == codes.AlreadyExists ||
		strings.Contains(err.Error(), "already present") ||
		strings.Contains(err.Error(), "already exists")
}

func handleExistingServer(ctx context.Context, client *backupdr.Client, parent string, w io.Writer) error {
	it := client.ListManagementServers(ctx, &backupdrpb.ListManagementServersRequest{
		Parent: parent,
	})
	existing, err := it.Next()
	if err != nil {
		return fmt.Errorf("ListManagementServers: %w", err)
	}
	fmt.Fprintf(w, "Created Management Server: %s\n", existing.GetName())
	return nil
}

// [END backupdr_v1beta_backupdr_managementserver_create]
