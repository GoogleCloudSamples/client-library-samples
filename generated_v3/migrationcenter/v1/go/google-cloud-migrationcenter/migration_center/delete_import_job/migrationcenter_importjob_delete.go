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

// [START migrationcenter_v1_migrationcenter_importjob_delete]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// deleteImportJob deletes an existing import job.
func deleteImportJob(ctx context.Context, w io.Writer, projectID string, locationID string, importJobID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/importJobs/%s", projectID, locationID, importJobID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("migrationcenter.NewClient: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.DeleteImportJobRequest{
		Name: name,
	}

	op, err := client.DeleteImportJob(ctx, req)
	if err != nil {
		return fmt.Errorf("client.DeleteImportJob: %w", err)
	}

	// DeleteImportJob is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted import job: %s\n", name)

	return nil
}

// [END migrationcenter_v1_migrationcenter_importjob_delete]
