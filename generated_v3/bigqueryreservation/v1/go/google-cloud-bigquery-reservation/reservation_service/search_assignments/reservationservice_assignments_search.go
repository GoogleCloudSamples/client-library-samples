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

// [START bigqueryreservation_v1_reservationservice_assignments_search]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/api/iterator"
)

// searchAssignments searches BigQuery reservation assignments matching a query.
func searchAssignments(ctx context.Context, w io.Writer, projectID string, locationID string, query string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.SearchAssignmentsRequest{
		Parent: parent,
		Query:  query,
	}

	it := client.SearchAssignments(ctx, req)
	for {
		assignment, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchAssignments: %w", err)
		}
		fmt.Fprintf(w, "Assignment: %s, Assignee: %s, JobType: %s\n",
			assignment.GetName(), assignment.GetAssignee(), assignment.GetJobType())
	}

	return nil
}

// [END bigqueryreservation_v1_reservationservice_assignments_search]
