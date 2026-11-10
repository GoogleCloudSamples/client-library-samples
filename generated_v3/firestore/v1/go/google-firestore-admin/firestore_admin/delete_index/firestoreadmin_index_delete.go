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

// [START firestore_admin_firestoreadmin_index_delete]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	firestorepb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
)

// deleteIndex deletes a Firestore index.
func deleteIndex(ctx context.Context, w io.Writer, projectID string, databaseID string, collectionID string, indexID string) error {
	name := fmt.Sprintf("projects/%s/databases/%s/collectionGroups/%s/indexes/%s", projectID, databaseID, collectionID, indexID)

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient: %w", err)
	}
	defer client.Close()

	req := &firestorepb.DeleteIndexRequest{
		Name: name,
	}

	if err := client.DeleteIndex(ctx, req); err != nil {
		return fmt.Errorf("DeleteIndex: %w", err)
	}

	fmt.Fprintf(w, "Deleted index: %s\n", name)
	return nil
}

// [END firestore_admin_firestoreadmin_index_delete]
