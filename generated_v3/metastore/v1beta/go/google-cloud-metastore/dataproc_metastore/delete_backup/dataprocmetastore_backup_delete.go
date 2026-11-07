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

// [START metastore_v1beta_dataprocmetastore_backup_delete]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1beta"
	metastorepb "cloud.google.com/go/metastore/apiv1beta/metastorepb"
)

// deleteBackup deletes a Dataproc Metastore backup.
func deleteBackup(ctx context.Context, w io.Writer, locationID string, serviceID string, backupID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/services/%s/backups/%s", projectID, locationID, serviceID, backupID)

	client, err := metastore.NewDataprocMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("metastore.NewDataprocMetastoreClient: %w", err)
	}
	defer client.Close()

	req := &metastorepb.DeleteBackupRequest{
		Name: name,
	}

	op, err := client.DeleteBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteBackup: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted backup: %s\n", name)
	return nil
}

// [END metastore_v1beta_dataprocmetastore_backup_delete]
