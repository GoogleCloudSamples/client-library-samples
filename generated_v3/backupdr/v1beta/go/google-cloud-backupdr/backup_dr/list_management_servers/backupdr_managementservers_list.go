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

// [START backupdr_v1beta_backupdr_managementservers_list]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
)

// listManagementServers lists all Backup and DR management servers in the specified location.
func listManagementServers(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.ListManagementServersRequest{
		Parent: parent,
	}

	it := client.ListManagementServers(ctx, req)
	for {
		server, err := it.Next()
		if err != nil {
			if err.Error() == "no more items in iterator" {
				break
			}
			return fmt.Errorf("failed to iterate management servers: %w", err)
		}
		fmt.Fprintf(w, "Management Server: %s\n", server.GetName())
	}

	return nil
}

// [END backupdr_v1beta_backupdr_managementservers_list]
