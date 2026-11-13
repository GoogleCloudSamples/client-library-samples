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

// [START eventarc_v1_eventarc_messagebus_get]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
)

// getMessageBus retrieves an Eventarc message bus.
func getMessageBus(ctx context.Context, w io.Writer, projectID string, locationID string, messageBusID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/messageBuses/%s", projectID, locationID, messageBusID)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.GetMessageBusRequest{
		Name: name,
	}

	messageBus, err := client.GetMessageBus(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetMessageBus failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved message bus: %s\n", messageBus.GetName())
	return nil
}

// [END eventarc_v1_eventarc_messagebus_get]
