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

// [START gkebackup_v1_backupforgke_backupplan_update]

import (
	"context"
	"fmt"
	"io"

	gkebackup "cloud.google.com/go/gkebackup/apiv1"
	gkebackuppb "cloud.google.com/go/gkebackup/apiv1/gkebackuppb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBackupPlan updates the description of an existing BackupPlan.
func updateBackupPlan(ctx context.Context, w io.Writer, projectID string, locationID string, backupPlanID string) error {
	backupPlan := &gkebackuppb.BackupPlan{
		Name:        fmt.Sprintf("projects/%s/locations/%s/backupPlans/%s", projectID, locationID, backupPlanID),
		Description: "Updated description for the backup plan",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := gkebackup.NewBackupForGKEClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBackupForGKEClient failed: %w", err)
	}
	defer client.Close()

	req := &gkebackuppb.UpdateBackupPlanRequest{
		BackupPlan: backupPlan,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateBackupPlan(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateBackupPlan failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait for backup plan update failed: %w", err)
	}

	fmt.Fprintf(w, "Updated backup plan: %s\n", resp.GetName())

	return nil
}

// [END gkebackup_v1_backupforgke_backupplan_update]
