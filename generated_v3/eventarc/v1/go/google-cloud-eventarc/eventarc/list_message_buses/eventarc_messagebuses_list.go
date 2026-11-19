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

// [START eventarc_v1_eventarc_messagebuses_list]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/api/iterator"
)

// listMessageBuses retrieves all message buses in the specified project and location.
func listMessageBuses(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("failed to create Eventarc client: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.ListMessageBusesRequest{
		Parent: parent,
	}

	it := client.ListMessageBuses(ctx, req)
	for {
		bus, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate message buses: %w", err)
		}
		fmt.Fprintf(w, "Message bus: %s\n", bus.GetName())
	}

	return nil
}

// [END eventarc_v1_eventarc_messagebuses_list]
