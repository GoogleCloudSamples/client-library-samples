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

// [START firestore_admin_firestoreadmin_database_delete]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
)

// deleteDatabase deletes a Firestore database.
func deleteDatabase(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	name := fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID)

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("firestore.NewFirestoreAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.DeleteDatabaseRequest{
		Name: name,
	}

	_, err = client.DeleteDatabase(ctx, req)
	if err != nil {
		return fmt.Errorf("client.DeleteDatabase: %w", err)
	}

	fmt.Fprintf(w, "Deleted database: %s\n", name)
	return nil
}

// [END firestore_admin_firestoreadmin_database_delete]
