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

// [START retail_v2beta_usereventservice_purge_user_events]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// purgeUserEvents permanently deletes user events matching the specified filter.
func purgeUserEvents(ctx context.Context, w io.Writer, projectID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global/catalogs/%s", projectID, catalogID)
	// Filter syntax requires specifying matching conditions for events to delete.
	filter := `eventType = "detail-page-view"`
	// Setting force to true permanently deletes matching events. Setting force to false runs a dry run.
	force := true

	client, err := retail.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.PurgeUserEventsRequest{
		Parent: parent,
		Filter: filter,
		Force:  force,
	}

	op, err := client.PurgeUserEvents(ctx, req)
	if err != nil {
		// Handle environments where Cloud Retail terms or onboarding prerequisites are pending.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "PurgeUserEvents precondition not met: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("PurgeUserEvents: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "PurgeUserEvents operation precondition not met: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Purged user events count: %d\n", resp.GetPurgedEventsCount())

	return nil
}

// [END retail_v2beta_usereventservice_purge_user_events]
