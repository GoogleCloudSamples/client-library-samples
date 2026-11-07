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

// [START netapp_v1_netapp_backuppolicy_create]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
	"google.golang.org/protobuf/proto"
)

// createBackupPolicy creates a new Cloud NetApp backup policy in a specified project and location.
func createBackupPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, backupPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	backupPolicy := &netapppb.BackupPolicy{
		DailyBackupLimit: proto.Int32(2),
		Enabled:          proto.Bool(true),
	}

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.CreateBackupPolicyRequest{
		Parent:         parent,
		BackupPolicyId: backupPolicyID,
		BackupPolicy:   backupPolicy,
	}

	op, err := client.CreateBackupPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateBackupPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created backup policy: %s\n", resp.GetName())

	return nil
}

// [END netapp_v1_netapp_backuppolicy_create]
