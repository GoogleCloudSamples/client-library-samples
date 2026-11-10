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

// [START firestore_admin_firestoreadmin_backups_list]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	"cloud.google.com/go/firestore/apiv1/admin/adminpb"
)

// listBackups lists Firestore backups in a given project and location.
func listBackups(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListBackupsRequest{
		Parent: parent,
	}

	resp, err := client.ListBackups(ctx, req)
	if err != nil {
		return fmt.Errorf("ListBackups: %w", err)
	}

	for _, backup := range resp.GetBackups() {
		fmt.Fprintf(w, "Backup: %s\n", backup.GetName())
	}

	return nil
}

// [END firestore_admin_firestoreadmin_backups_list]
