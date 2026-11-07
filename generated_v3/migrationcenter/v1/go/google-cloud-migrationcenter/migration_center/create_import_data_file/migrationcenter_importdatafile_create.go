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

// [START migrationcenter_v1_migrationcenter_importdatafile_create]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// createImportDataFile creates an import data file resource under an import job.
func createImportDataFile(ctx context.Context, w io.Writer, importDataFileID string, projectID string, locationID string, importJobID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/importJobs/%s", projectID, locationID, importJobID)
	importDataFile := &migrationcenterpb.ImportDataFile{
		DisplayName: "Example Import Data File",
		Format:      migrationcenterpb.ImportJobFormat_IMPORT_JOB_FORMAT_STRATOZONE_CSV,
	}

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.CreateImportDataFileRequest{
		Parent:           parent,
		ImportDataFileId: importDataFileID,
		ImportDataFile:   importDataFile,
	}

	op, err := client.CreateImportDataFile(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateImportDataFile failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created import data file: %s\n", resp.GetName())
	return nil
}

// [END migrationcenter_v1_migrationcenter_importdatafile_create]
