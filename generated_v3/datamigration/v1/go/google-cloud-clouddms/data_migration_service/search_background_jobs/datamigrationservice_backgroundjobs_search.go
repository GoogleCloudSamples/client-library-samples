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

// [START datamigration_v1_datamigrationservice_backgroundjobs_search]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	"cloud.google.com/go/clouddms/apiv1/clouddmspb"
)

// searchBackgroundJobs lists background jobs completed or in-progress for a conversion workspace.
func searchBackgroundJobs(ctx context.Context, w io.Writer, projectID string, locationID string, conversionWorkspaceID string) error {
	conversionWorkspace := fmt.Sprintf("projects/%s/locations/%s/conversionWorkspaces/%s", projectID, locationID, conversionWorkspaceID)

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &clouddmspb.SearchBackgroundJobsRequest{
		ConversionWorkspace: conversionWorkspace,
	}

	resp, err := client.SearchBackgroundJobs(ctx, req)
	if err != nil {
		return fmt.Errorf("SearchBackgroundJobs failed: %w", err)
	}

	fmt.Fprintf(w, "Found %d background jobs for conversion workspace:\n", len(resp.GetJobs()))
	for _, job := range resp.GetJobs() {
		fmt.Fprintf(w, "- Job ID: %s, Type: %s, State: %s\n", job.GetId(), job.GetJobType(), job.GetCompletionState())
	}

	return nil
}

// [END datamigration_v1_datamigrationservice_backgroundjobs_search]
