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

// [START metastore_v1_dataprocmetastore_backup_get]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1beta"
	"cloud.google.com/go/metastore/apiv1beta/metastorepb"
)

// Use the GetBackup method.
func getBackup(ctx context.Context, w io.Writer, locationID string, serviceID string, backupID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/services/%s/backups/%s", projectID, locationID, serviceID, backupID)

	client, err := metastore.NewDataprocMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataprocMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &metastorepb.GetBackupRequest{
		Name: name,
	}

	backup, err := client.GetBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetBackup: %w", err)
	}

	fmt.Fprintf(w, "Retrieved backup: %s\n", backup.GetName())
	fmt.Fprintf(w, "Backup state: %s\n", backup.GetState())

	return nil
}

// [END metastore_v1_dataprocmetastore_backup_get]
