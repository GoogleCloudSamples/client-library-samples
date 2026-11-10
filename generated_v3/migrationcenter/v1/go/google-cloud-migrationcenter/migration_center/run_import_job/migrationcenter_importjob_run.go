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

// [START migrationcenter_v1_migrationcenter_run_import_job]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// runImportJob runs an existing validated Migration Center import job.
func runImportJob(ctx context.Context, w io.Writer, projectID string, locationID string, importJobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/importJobs/%s", projectID, locationID, importJobID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("migrationcenter.NewClient: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.RunImportJobRequest{
		Name: name,
	}

	op, err := client.RunImportJob(ctx, req)
	if err != nil {
		return fmt.Errorf("RunImportJob: %w", err)
	}

	// Wait blocks until the import job execution completes.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Import job run completed: %s\n", name)
	return nil
}

// [END migrationcenter_v1_migrationcenter_run_import_job]
