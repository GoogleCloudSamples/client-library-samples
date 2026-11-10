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

// [START metastore_v1_dataprocmetastore_restore_service]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1"
	metastorepb "cloud.google.com/go/metastore/apiv1/metastorepb"
)

// restoreService restores a Dataproc Metastore service from a backup.
func restoreService(ctx context.Context, w io.Writer, projectID string, locationID string, serviceID string, backupID string) error {
	backup := fmt.Sprintf("projects/%s/locations/%s/services/%s/backups/%s", projectID, locationID, serviceID, backupID)
	service := fmt.Sprintf("projects/%s/locations/%s/services/%s", projectID, locationID, serviceID)

	client, err := metastore.NewDataprocMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataprocMetastoreClient: %w", err)
	}
	defer client.Close()

	req := &metastorepb.RestoreServiceRequest{
		Service: service,
		Backup:  backup,
	}

	op, err := client.RestoreService(ctx, req)
	if err != nil {
		return fmt.Errorf("RestoreService: %w", err)
	}

	fmt.Fprintf(w, "Restore operation started: %s\n", op.Name())

	return nil
}

// [END metastore_v1_dataprocmetastore_restore_service]
