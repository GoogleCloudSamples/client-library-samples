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

// [START firestore_admin_firestoreadmin_backupschedule_delete]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
)

// deleteBackupSchedule deletes a Firestore backup schedule.
func deleteBackupSchedule(ctx context.Context, w io.Writer, projectID string, databaseID string, backupScheduleID string) error {
	name := fmt.Sprintf("projects/%s/databases/%s/backupSchedules/%s", projectID, databaseID, backupScheduleID)

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.DeleteBackupScheduleRequest{
		Name: name,
	}

	if err := client.DeleteBackupSchedule(ctx, req); err != nil {
		return fmt.Errorf("DeleteBackupSchedule failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted backup schedule: %s\n", name)
	return nil
}

// [END firestore_admin_firestoreadmin_backupschedule_delete]
