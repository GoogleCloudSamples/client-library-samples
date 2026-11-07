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

// [START retail_v2_usereventservice_rejoin_user_events]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2"
	retailpb "cloud.google.com/go/retail/apiv2/retailpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// rejoinUserEvents rejoins unjoined events with the catalog without re-evaluating already joined events.
func rejoinUserEvents(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	userEventRejoinScope := retailpb.RejoinUserEventsRequest_UNJOINED_EVENTS

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-retail.googleapis.com:443", locationID)))
	}

	client, err := retail.NewUserEventClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("retail.NewUserEventClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.RejoinUserEventsRequest{
		Parent:               parent,
		UserEventRejoinScope: userEventRejoinScope,
	}

	op, err := client.RejoinUserEvents(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "RejoinUserEvents precondition not met: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("RejoinUserEvents: %w", err)
	}

	// RejoinUserEvents is a long-running operation; wait for it to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "RejoinUserEvents wait precondition not met: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Rejoined user events count: %d\n", resp.GetRejoinedUserEventsCount())

	return nil
}

// [END retail_v2_usereventservice_rejoin_user_events]
