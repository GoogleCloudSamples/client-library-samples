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

// [START gkebackup_v1_backupforgke_backupchannels_list]

import (
	"context"
	"fmt"
	"io"

	gkebackup "cloud.google.com/go/gkebackup/apiv1"
	gkebackuppb "cloud.google.com/go/gkebackup/apiv1/gkebackuppb"
	"google.golang.org/api/iterator"
)

// listBackupChannels retrieves all backup channels in a given project and location.
func listBackupChannels(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := gkebackup.NewBackupForGKEClient(ctx)
	if err != nil {
		return fmt.Errorf("failed to create client: %w", err)
	}
	defer client.Close()

	req := &gkebackuppb.ListBackupChannelsRequest{
		Parent: parent,
	}

	it := client.ListBackupChannels(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate backup channels: %w", err)
		}
		fmt.Fprintf(w, "Backup channel: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No backup channels found.")
	}

	return nil
}

// [END gkebackup_v1_backupforgke_backupchannels_list]
