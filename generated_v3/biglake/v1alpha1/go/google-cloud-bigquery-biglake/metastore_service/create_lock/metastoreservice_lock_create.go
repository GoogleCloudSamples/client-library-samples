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

// [START biglake_v1alpha1_metastoreservice_lock_create]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1alpha1"
	biglakepb "cloud.google.com/go/bigquery/biglake/apiv1alpha1/biglakepb"
)

// createLock creates an exclusive lock on a specified table in BigLake Metastore.
func createLock(ctx context.Context, w io.Writer, locationID string, catalogID string, databaseID string, tableID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s", projectID, locationID, catalogID, databaseID)
	lock := &biglakepb.Lock{
		Type: biglakepb.Lock_EXCLUSIVE,
		Resources: &biglakepb.Lock_TableId{
			TableId: tableID,
		},
	}

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.CreateLockRequest{
		Parent: parent,
		Lock:   lock,
	}

	resp, err := client.CreateLock(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateLock failed: %w", err)
	}

	fmt.Fprintf(w, "Created lock: %s\n", resp.GetName())
	return nil
}

// [END biglake_v1alpha1_metastoreservice_lock_create]
