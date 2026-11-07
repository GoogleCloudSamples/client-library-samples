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

// [START migrationcenter_v1_migrationcenter_importdatafiles_list]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
	"google.golang.org/api/iterator"
)

// Use the ListImportDataFiles method.
func listImportDataFiles(ctx context.Context, w io.Writer, projectID string, locationID string, importJobID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/importJobs/%s", projectID, locationID, importJobID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.ListImportDataFilesRequest{
		Parent: parent,
	}

	it := client.ListImportDataFiles(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListImportDataFiles failed: %w", err)
		}
		fmt.Fprintf(w, "Import data file: %s\n", resp.GetName())
	}

	return nil
}

// [END migrationcenter_v1_migrationcenter_importdatafiles_list]
