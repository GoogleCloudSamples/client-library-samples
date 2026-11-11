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

// [START analyticshub_v2alpha_migrationservice_migrationworkflows_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	analyticshub "cloud.google.com/go/bigquery/migration/apiv2alpha"
	migrationpb "cloud.google.com/go/bigquery/migration/apiv2alpha/migrationpb"
	"google.golang.org/api/iterator"
)

// listMigrationWorkflows lists BigQuery migration workflows in a location.
func listMigrationWorkflows(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("analyticshub.NewClient: %w", err)
	}
	defer client.Close()

	req := &migrationpb.ListMigrationWorkflowsRequest{
		Parent: parent,
	}

	it := client.ListMigrationWorkflows(ctx, req)
	for {
		workflow, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate migration workflows: %w", err)
		}
		fmt.Fprintf(w, "Migration workflow: %s\n", workflow.GetName())
	}

	return nil
}

// [END analyticshub_v2alpha_migrationservice_migrationworkflows_list]
