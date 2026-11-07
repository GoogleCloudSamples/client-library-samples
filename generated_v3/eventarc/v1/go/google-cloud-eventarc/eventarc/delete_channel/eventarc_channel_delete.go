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

// [START eventarc_v1_eventarc_channel_delete]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	"cloud.google.com/go/eventarc/apiv1/eventarcpb"
)

// deleteChannel deletes an existing Eventarc channel.
func deleteChannel(ctx context.Context, w io.Writer, projectID string, locationID string, channelID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/channels/%s", projectID, locationID, channelID)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.DeleteChannelRequest{
		Name: name,
	}

	op, err := client.DeleteChannel(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteChannel failed: %w", err)
	}

	// DeleteChannel is a long-running operation; wait for it to complete.
	ch, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted channel: %s\n", ch.GetName())
	return nil
}

// [END eventarc_v1_eventarc_channel_delete]
