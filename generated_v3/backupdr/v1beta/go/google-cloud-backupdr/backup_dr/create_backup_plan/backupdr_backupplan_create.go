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

// [START backupdr_v1beta_backupdr_backupplan_create]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
)

// createBackupPlan creates a backup plan in Google Cloud Backup and DR.
func createBackupPlan(ctx context.Context, w io.Writer, projectID string, locationID string, backupPlanID string, backupVaultID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	backupVault := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s", projectID, locationID, backupVaultID)

	backupWindow := &backupdrpb.BackupWindow{
		StartHourOfDay: 0,
		EndHourOfDay:   6,
	}

	standardSchedule := &backupdrpb.StandardSchedule{
		RecurrenceType: backupdrpb.StandardSchedule_DAILY,
		TimeZone:       "UTC",
		BackupWindow:   backupWindow,
	}

	backupRule := &backupdrpb.BackupRule{
		RuleId:              "rule-1",
		BackupRetentionDays: 14,
		BackupScheduleOneof: &backupdrpb.BackupRule_StandardSchedule{
			StandardSchedule: standardSchedule,
		},
	}

	backupPlan := &backupdrpb.BackupPlan{
		ResourceType: "compute.googleapis.com/Instance",
		BackupVault:  backupVault,
		BackupRules:  []*backupdrpb.BackupRule{backupRule},
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.CreateBackupPlanRequest{
		Parent:       parent,
		BackupPlanId: backupPlanID,
		BackupPlan:   backupPlan,
	}

	op, err := client.CreateBackupPlan(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateBackupPlan failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created backup plan: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1beta_backupdr_backupplan_create]
