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

// [START backupdr_v1beta_backupdr_backupplanassociations_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/api/iterator"
)

// listBackupPlanAssociations lists backup plan associations in a given project and location.
func listBackupPlanAssociations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.ListBackupPlanAssociationsRequest{
		Parent: parent,
	}

	it := client.ListBackupPlanAssociations(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListBackupPlanAssociations iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Backup plan association: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No backup plan associations found.")
	}

	return nil
}

// [END backupdr_v1beta_backupdr_backupplanassociations_list]
