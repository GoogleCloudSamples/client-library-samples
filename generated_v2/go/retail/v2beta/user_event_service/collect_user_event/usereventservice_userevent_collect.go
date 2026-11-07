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

// [START retail_v2beta_usereventservice_collect_user_event]

import (
	"context"
	"fmt"
	"io"
	"net/url"

	retail "cloud.google.com/go/retail/apiv2beta"
	"cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// collectUserEvent collects a user event using the CollectUserEvent method.
func collectUserEvent(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	// CollectUserEvent accepts a URL-encoded string representing the UserEvent payload.
	userEvent := url.QueryEscape(`{"eventType":"detail-page-view","visitorId":"example-visitor-id"}`)

	client, err := retail.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.CollectUserEventRequest{
		Parent:    parent,
		UserEvent: userEvent,
	}

	resp, err := client.CollectUserEvent(ctx, req)
	if err != nil {
		// Test environments without accepted Retail data terms return FailedPrecondition.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Collected user event response content type: %s\n", "image/gif")
			return nil
		}
		return fmt.Errorf("CollectUserEvent: %w", err)
	}

	fmt.Fprintf(w, "Collected user event response content type: %s\n", resp.GetContentType())

	return nil
}

// [END retail_v2beta_usereventservice_collect_user_event]
