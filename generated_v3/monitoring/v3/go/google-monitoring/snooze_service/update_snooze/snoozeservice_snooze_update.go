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

// [START monitoring_v2_snoozeservice_snooze_update]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateSnooze updates the display name of an existing snooze.
func updateSnooze(ctx context.Context, w io.Writer, projectID string, snoozeID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}
	snooze := &monitoringpb.Snooze{
		Name:        fmt.Sprintf("projects/%s/snoozes/%s", projectID, snoozeID),
		DisplayName: "Updated Maintenance Snooze",
	}

	client, err := monitoring.NewSnoozeClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSnoozeClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.UpdateSnoozeRequest{
		Snooze:     snooze,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateSnooze(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateSnooze: %w", err)
	}

	fmt.Fprintf(w, "Updated snooze: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_snoozeservice_snooze_update]
