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

// [START retail_v2beta_usereventservice_rejoin_user_events]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// rejoinUserEvents rejoins unjoined user events with catalog data.
func rejoinUserEvents(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	userEventRejoinScope := retailpb.RejoinUserEventsRequest_UNJOINED_EVENTS

	client, err := retail.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("retail.NewUserEventClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.RejoinUserEventsRequest{
		Parent:               parent,
		UserEventRejoinScope: userEventRejoinScope,
	}

	// RejoinUserEvents starts a long-running operation.
	op, err := client.RejoinUserEvents(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Rejoined user events count: 0\n")
			return nil
		}
		return fmt.Errorf("client.RejoinUserEvents: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Rejoined user events count: 0\n")
			return nil
		}
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Rejoined user events count: %d\n", resp.GetRejoinedUserEventsCount())

	return nil
}

// [END retail_v2beta_usereventservice_rejoin_user_events]
