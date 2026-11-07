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

// [START servicehealth_v1_servicehealth_events_list]

import (
	"context"
	"fmt"
	"io"

	servicehealth "cloud.google.com/go/servicehealth/apiv1"
	servicehealthpb "cloud.google.com/go/servicehealth/apiv1/servicehealthpb"
	"google.golang.org/api/iterator"
)

// Use the ListEvents method.
func listEvents(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := servicehealth.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &servicehealthpb.ListEventsRequest{
		Parent: parent,
	}

	it := client.ListEvents(ctx, req)
	for {
		event, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListEvents failed: %w", err)
		}
		fmt.Fprintf(w, "Event: %s\n", event.GetName())
	}

	return nil
}

// [END servicehealth_v1_servicehealth_events_list]
