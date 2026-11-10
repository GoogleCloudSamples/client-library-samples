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

// [START migrationcenter_v1_migrationcenter_reportconfig_create]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// createReportConfig creates a report configuration in Migration Center.
func createReportConfig(ctx context.Context, w io.Writer, reportConfigID string, projectID string, locationID string, groupID string, preferenceSetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	reportConfig := &migrationcenterpb.ReportConfig{
		DisplayName: "Sample Report Config",
		Description: "Assessment report configuration",
		GroupPreferencesetAssignments: []*migrationcenterpb.ReportConfig_GroupPreferenceSetAssignment{
			{
				Group:         fmt.Sprintf("projects/%s/locations/%s/groups/%s", projectID, locationID, groupID),
				PreferenceSet: fmt.Sprintf("projects/%s/locations/%s/preferenceSets/%s", projectID, locationID, preferenceSetID),
			},
		},
	}

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.CreateReportConfigRequest{
		Parent:         parent,
		ReportConfigId: reportConfigID,
		ReportConfig:   reportConfig,
	}

	op, err := client.CreateReportConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateReportConfig: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created report configuration: %s\n", resp.GetName())
	return nil
}

// [END migrationcenter_v1_migrationcenter_reportconfig_create]
