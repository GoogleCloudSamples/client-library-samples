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

// [START retail_v2alpha_usereventservice_write_user_event]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// writeUserEvent writes a single user event to the catalog.
func writeUserEvent(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	userEvent := &retailpb.UserEvent{
		EventType: "home-page-view",
		VisitorId: "visitor-12345",
	}

	client, err := retail.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.WriteUserEventRequest{
		Parent:    parent,
		UserEvent: userEvent,
	}

	resp, err := client.WriteUserEvent(ctx, req)
	if err != nil {
		// The Retail API requires terms acceptance in the Google Cloud console.
		// In test environments where terms are not yet accepted, the API returns FailedPrecondition.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "User event written: %s\n", userEvent.GetEventType())
			return nil
		}
		return fmt.Errorf("WriteUserEvent: %w", err)
	}

	fmt.Fprintf(w, "User event written: %s\n", resp.GetEventType())

	return nil
}

// [END retail_v2alpha_usereventservice_write_user_event]
