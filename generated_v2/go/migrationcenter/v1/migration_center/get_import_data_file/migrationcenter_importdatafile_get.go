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

// [START migrationcenter_v1_migrationcenter_importdatafile_get]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	"cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// getImportDataFile retrieves details for a specific Migration Center import data file.
func getImportDataFile(ctx context.Context, w io.Writer, projectID string, locationID string, importJobID string, importDataFileID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/importJobs/%s/importDataFiles/%s", projectID, locationID, importJobID, importDataFileID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.GetImportDataFileRequest{
		Name: name,
	}

	resp, err := client.GetImportDataFile(ctx, req)
	if err != nil {
		return fmt.Errorf("GetImportDataFile: %w", err)
	}

	fmt.Fprintf(w, "Import data file: %s\nState: %s\n", resp.GetName(), resp.GetState())
	return nil
}

// [END migrationcenter_v1_migrationcenter_importdatafile_get]
