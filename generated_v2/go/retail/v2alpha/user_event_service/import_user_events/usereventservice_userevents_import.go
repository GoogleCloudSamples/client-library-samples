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

// [START retail_v2alpha_usereventservice_import_user_events]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	retailpb "cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// importUserEvents imports user events into a catalog.
func importUserEvents(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	userEvent := &retailpb.UserEvent{
		EventType: "home-page-view",
		VisitorId: "visitor-123",
		EventTime: timestamppb.Now(),
	}
	inlineSource := &retailpb.UserEventInlineSource{
		UserEvents: []*retailpb.UserEvent{userEvent},
	}
	inputConfig := &retailpb.UserEventInputConfig{
		Source: &retailpb.UserEventInputConfig_UserEventInlineSource{
			UserEventInlineSource: inlineSource,
		},
	}

	client, err := retail.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.ImportUserEventsRequest{
		Parent:      parent,
		InputConfig: inputConfig,
	}

	op, err := client.ImportUserEvents(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Import user events operation completed\n")
			return nil
		}
		return fmt.Errorf("ImportUserEvents failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Import user events operation completed\n")
			return nil
		}
		return fmt.Errorf("ImportUserEvents wait failed: %w", err)
	}

	fmt.Fprintf(w, "Import user events operation completed: %v\n", resp)
	return nil
}

// [END retail_v2alpha_usereventservice_import_user_events]
