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

// [START analyticshub_v2_routineservice_routine_get]

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/bigquery"
)

// getRoutine retrieves a BigQuery routine by ID.
func getRoutine(ctx context.Context, w io.Writer, datasetID string, projectID string, routineID string) error {
	client, err := bigquery.NewClient(ctx, projectID)
	if err != nil {
		return fmt.Errorf("bigquery.NewClient: %w", err)
	}
	defer client.Close()

	routine := client.Dataset(datasetID).Routine(routineID)
	if _, err := routine.Metadata(ctx); err != nil {
		return fmt.Errorf("routine.Metadata: %w", err)
	}

	fmt.Fprintf(w, "Routine: %s\n", routine.RoutineID)
	return nil
}

// [END analyticshub_v2_routineservice_routine_get]
