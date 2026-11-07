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

// [START analyticshub_v2_jobservice_query]

import (
	"context"
	"fmt"
	"io"

	"google.golang.org/api/bigquery/v2"
)

// query executes a query using the BigQuery jobs service.
func query(ctx context.Context, w io.Writer, projectID string) error {
	service, err := bigquery.NewService(ctx)
	if err != nil {
		return fmt.Errorf("bigquery.NewService: %w", err)
	}

	req := &bigquery.QueryRequest{
		Query: "SELECT 1",
	}

	resp, err := service.Jobs.Query(projectID, req).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("service.Jobs.Query: %w", err)
	}

	if resp.JobReference != nil {
		fmt.Fprintf(w, "Query completed successfully: job ID %s\n", resp.JobReference.JobId)
	} else {
		fmt.Fprintf(w, "Query completed successfully: complete=%t\n", resp.JobComplete)
	}
	return nil
}

// [END analyticshub_v2_jobservice_query]
