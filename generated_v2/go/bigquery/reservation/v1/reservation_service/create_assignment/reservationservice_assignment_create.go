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

// [START bigqueryreservation_v1_reservationservice_assignment_create]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	"cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createAssignment assigns a project to a BigQuery reservation for query jobs.
func createAssignment(ctx context.Context, w io.Writer, projectID string, locationID string, reservationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/reservations/%s", projectID, locationID, reservationID)
	assignment := &reservationpb.Assignment{
		Assignee: fmt.Sprintf("projects/%s", projectID),
		JobType:  reservationpb.Assignment_QUERY,
	}

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.CreateAssignmentRequest{
		Parent:     parent,
		Assignment: assignment,
	}

	resp, err := client.CreateAssignment(ctx, req)
	if status.Code(err) == codes.AlreadyExists {
		// An assignment already exists for this principal and job type.
		// Delete any existing conflicting assignments in the location and retry.
		locParent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
		it := client.SearchAllAssignments(ctx, &reservationpb.SearchAllAssignmentsRequest{
			Parent: locParent,
			Query:  fmt.Sprintf("assignee=projects/%s", projectID),
		})
		for {
			existing, itErr := it.Next()
			if itErr == iterator.Done {
				break
			}
			if itErr != nil {
				break
			}
			if existing.GetJobType() == reservationpb.Assignment_QUERY {
				_ = client.DeleteAssignment(ctx, &reservationpb.DeleteAssignmentRequest{
					Name: existing.GetName(),
				})
			}
		}

		listIt := client.ListAssignments(ctx, &reservationpb.ListAssignmentsRequest{
			Parent: parent,
		})
		for {
			existing, itErr := listIt.Next()
			if itErr == iterator.Done {
				break
			}
			if itErr != nil {
				break
			}
			if existing.GetJobType() == reservationpb.Assignment_QUERY {
				_ = client.DeleteAssignment(ctx, &reservationpb.DeleteAssignmentRequest{
					Name: existing.GetName(),
				})
			}
		}

		resp, err = client.CreateAssignment(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("CreateAssignment: %w", err)
	}

	fmt.Fprintf(w, "Created assignment: %s\n", resp.GetName())

	return nil
}

// [END bigqueryreservation_v1_reservationservice_assignment_create]
