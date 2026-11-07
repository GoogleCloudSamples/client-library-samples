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

// [START retail_v2alpha_usereventservice_collect_user_event]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// collectUserEvent collects a user event using a URL-encoded string payload.
func collectUserEvent(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)
	// CollectUserEvent expects a URL-encoded UserEvent payload.
	userEvent := "%7B%22eventType%22%3A%22home-page-view%22%2C%22visitorId%22%3A%22example-visitor-id%22%7D"

	client, err := retail.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.CollectUserEventRequest{
		Parent:    parent,
		UserEvent: userEvent,
	}

	resp, err := client.CollectUserEvent(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Cloud Retail is not enabled or terms are not accepted: %v\n", st.Message())
			return nil
		}
		return fmt.Errorf("CollectUserEvent failed: %w", err)
	}

	fmt.Fprintf(w, "Collected user event response content type: %s\n", resp.GetContentType())
	return nil
}

// [END retail_v2alpha_usereventservice_collect_user_event]
