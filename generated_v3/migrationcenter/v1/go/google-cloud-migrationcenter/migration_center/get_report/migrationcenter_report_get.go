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

// [START migrationcenter_v1_migrationcenter_report_get]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// Use the GetReport method.
func getReport(ctx context.Context, w io.Writer, projectID string, locationID string, reportConfigID string, reportID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/reportConfigs/%s/reports/%s", projectID, locationID, reportConfigID, reportID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.GetReportRequest{
		Name: name,
	}

	report, err := client.GetReport(ctx, req)
	if err != nil {
		return fmt.Errorf("GetReport: %w", err)
	}

	fmt.Fprintf(w, "Retrieved report: %s\n", report.GetName())
	fmt.Fprintf(w, "State: %s\n", report.GetState())

	return nil
}

// [END migrationcenter_v1_migrationcenter_report_get]
