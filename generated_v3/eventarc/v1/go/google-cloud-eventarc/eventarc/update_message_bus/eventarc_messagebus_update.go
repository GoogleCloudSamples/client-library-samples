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

// [START eventarc_v1_eventarc_messagebus_update]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateMessageBus updates the display name of a message bus in Eventarc.
func updateMessageBus(ctx context.Context, w io.Writer, projectID string, locationID string, messageBusID string) error {
	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("eventarc.NewClient: %w", err)
	}
	defer client.Close()

	busPath := fmt.Sprintf("projects/%s/locations/%s/messageBuses/%s", projectID, locationID, messageBusID)
	messageBus := &eventarcpb.MessageBus{
		Name:        busPath,
		DisplayName: "Updated Message Bus",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &eventarcpb.UpdateMessageBusRequest{
		MessageBus: messageBus,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateMessageBus(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateMessageBus: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated message bus: %s\n", resp.GetName())
	return nil
}

// [END eventarc_v1_eventarc_messagebus_update]
