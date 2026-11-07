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

// [START analyticshub_v2_routineservice_insert_routine]

import (
	"context"
	"fmt"
	"io"

	bigquery "google.golang.org/api/bigquery/v2"
)

// insertRoutine creates a new routine in the specified dataset.
func insertRoutine(ctx context.Context, w io.Writer, datasetID string, projectID string) error {
	routine := &bigquery.Routine{
		RoutineType: "SCALAR_FUNCTION",
		RoutineReference: &bigquery.RoutineReference{
			ProjectId: projectID,
			DatasetId: datasetID,
			RoutineId: "example_routine",
		},
		Language:       "SQL",
		DefinitionBody: "42",
	}

	client, err := bigquery.NewService(ctx)
	if err != nil {
		return fmt.Errorf("bigquery.NewService: %w", err)
	}

	resp, err := client.Routines.Insert(projectID, datasetID, routine).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("client.Routines.Insert: %w", err)
	}

	fmt.Fprintf(w, "Created routine: %s\n", resp.RoutineReference.RoutineId)
	return nil
}

// [END analyticshub_v2_routineservice_insert_routine]
