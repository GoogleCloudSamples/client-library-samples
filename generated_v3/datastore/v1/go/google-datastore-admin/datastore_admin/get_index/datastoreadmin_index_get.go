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

// [START datastore_v1_datastoreadmin_index_get]

import (
	"context"
	"fmt"
	"io"

	datastore "cloud.google.com/go/datastore/admin/apiv1"
	adminpb "cloud.google.com/go/datastore/admin/apiv1/adminpb"
)

// getIndex retrieves an existing Datastore composite index by ID.
func getIndex(ctx context.Context, w io.Writer, projectID string, indexID string) error {
	client, err := datastore.NewDatastoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDatastoreAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetIndexRequest{
		ProjectId: projectID,
		IndexId:   indexID,
	}

	index, err := client.GetIndex(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIndex: %w", err)
	}

	fmt.Fprintf(w, "Retrieved index: %s (kind: %s, state: %s)\n", index.GetIndexId(), index.GetKind(), index.GetState())
	return nil
}

// [END datastore_v1_datastoreadmin_index_get]
