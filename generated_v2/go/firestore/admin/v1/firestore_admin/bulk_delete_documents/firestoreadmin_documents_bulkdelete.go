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

// [START firestore_admin_firestoreadmin_bulk_delete_documents]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
)

// bulkDeleteDocuments executes a bulk delete operation on a Firestore database.
func bulkDeleteDocuments(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	name := fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID)

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.BulkDeleteDocumentsRequest{
		Name:          name,
		CollectionIds: []string{"widgets"},
	}

	op, err := client.BulkDeleteDocuments(ctx, req)
	if err != nil {
		return fmt.Errorf("BulkDeleteDocuments failed: %w", err)
	}

	fmt.Fprintf(w, "Started bulk delete operation: %s\n", op.Name())

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Completed bulk delete operation: %v\n", resp)
	return nil
}

// [END firestore_admin_firestoreadmin_bulk_delete_documents]
