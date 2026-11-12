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

// [START monitoring_v2_snoozeservice_snooze_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// Use the CreateSnooze method.
func createSnooze(ctx context.Context, w io.Writer, alertPolicyID string, projectID string) error {
	client, err := monitoring.NewSnoozeClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSnoozeClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s", projectID)
	startTime := time.Now().Add(1 * time.Minute)
	endTime := startTime.Add(1 * time.Hour)

	snooze := &monitoringpb.Snooze{
		DisplayName: "Temporary Maintenance Snooze",
		Criteria: &monitoringpb.Snooze_Criteria{
			Policies: []string{
				fmt.Sprintf("projects/%s/alertPolicies/%s", projectID, alertPolicyID),
			},
		},
		Interval: &monitoringpb.TimeInterval{
			StartTime: timestamppb.New(startTime),
			EndTime:   timestamppb.New(endTime),
		},
	}

	req := &monitoringpb.CreateSnoozeRequest{
		Parent: parent,
		Snooze: snooze,
	}

	resp, err := client.CreateSnooze(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSnooze failed: %w", err)
	}

	fmt.Fprintf(w, "Created snooze: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_snoozeservice_snooze_create]
