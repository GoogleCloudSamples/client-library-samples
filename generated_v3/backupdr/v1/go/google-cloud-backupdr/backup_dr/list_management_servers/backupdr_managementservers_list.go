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

// [START backupdr_v1_backupdr_managementservers_list]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
	"google.golang.org/api/iterator"
)

// listManagementServers lists Backup and DR management servers in a location.
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
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListManagementServers failed: %w", err)
		}
		fmt.Fprintf(w, "Management server: %s\n", resp.GetName())
	}

	return nil
}

// [END backupdr_v1_backupdr_managementservers_list]
