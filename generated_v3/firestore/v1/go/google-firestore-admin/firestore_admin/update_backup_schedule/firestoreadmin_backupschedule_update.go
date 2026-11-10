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

// [START firestore_admin_firestoreadmin_backupschedule_update]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBackupSchedule updates the retention period of an existing Firestore backup schedule.
func updateBackupSchedule(ctx context.Context, w io.Writer, projectID string, databaseID string, backupScheduleID string) error {
	scheduleName := fmt.Sprintf("projects/%s/databases/%s/backupSchedules/%s", projectID, databaseID, backupScheduleID)

	backupSchedule := &adminpb.BackupSchedule{
		Name: scheduleName,
		Retention: &durationpb.Duration{
			Seconds: 604800, // 7 days
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"retention"},
	}

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.UpdateBackupScheduleRequest{
		BackupSchedule: backupSchedule,
		UpdateMask:     updateMask,
	}

	updatedSchedule, err := client.UpdateBackupSchedule(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateBackupSchedule failed: %w", err)
	}

	fmt.Fprintf(w, "Updated backup schedule: %s\n", updatedSchedule.GetName())
	return nil
}

// [END firestore_admin_firestoreadmin_backupschedule_update]
