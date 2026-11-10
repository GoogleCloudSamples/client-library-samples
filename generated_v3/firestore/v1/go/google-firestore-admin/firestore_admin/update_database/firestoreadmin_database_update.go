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

// [START firestore_admin_firestoreadmin_database_update]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateDatabase updates the delete protection setting for a Firestore database.
func updateDatabase(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	database := &adminpb.Database{
		Name:                  fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID),
		DeleteProtectionState: adminpb.Database_DELETE_PROTECTION_ENABLED,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"delete_protection_state"},
	}

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.UpdateDatabaseRequest{
		Database:   database,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateDatabase(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDatabase failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated database: %s\n", resp.GetName())
	return nil
}

// [END firestore_admin_firestoreadmin_database_update]
