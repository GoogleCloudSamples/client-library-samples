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

// [START migrationcenter_v1_migrationcenter_reports_list]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
	"google.golang.org/api/iterator"
)

// listReports retrieves all reports associated with a report configuration.
func listReports(ctx context.Context, w io.Writer, projectID string, locationID string, reportConfigID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/reportConfigs/%s", projectID, locationID, reportConfigID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.ListReportsRequest{
		Parent: parent,
	}

	it := client.ListReports(ctx, req)
	for {
		report, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate reports: %w", err)
		}

		fmt.Fprintf(w, "Report: %s (State: %s)\n", report.GetName(), report.GetState())
	}

	return nil
}

// [END migrationcenter_v1_migrationcenter_reports_list]
