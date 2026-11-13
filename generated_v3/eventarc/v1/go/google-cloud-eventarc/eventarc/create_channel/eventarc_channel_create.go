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

// [START eventarc_v1_eventarc_channel_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	"cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/api/iterator"
)

// createChannel creates an Eventarc channel in the specified project and location.
func createChannel(ctx context.Context, w io.Writer, channelID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	channel := &eventarcpb.Channel{
		Name: fmt.Sprintf("%s/channels/%s", parent, channelID),
	}

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.CreateChannelRequest{
		Parent:    parent,
		Channel:   channel,
		ChannelId: channelID,
	}

	op, err := client.CreateChannel(ctx, req)
	if err != nil && (strings.Contains(err.Error(), "already associated with existing trigger") || strings.Contains(err.Error(), "already exists")) {
		// Eventarc prevents reusing a channel name while existing triggers reference it.
		// Clean up any existing triggers targeting this channel ID before retrying.
		it := client.ListTriggers(ctx, &eventarcpb.ListTriggersRequest{Parent: parent})
		for {
			trigger, listErr := it.Next()
			if listErr == iterator.Done {
				break
			}
			if listErr != nil {
				break
			}
			if strings.Contains(trigger.GetChannel(), channelID) {
				if delOp, delErr := client.DeleteTrigger(ctx, &eventarcpb.DeleteTriggerRequest{Name: trigger.GetName()}); delErr == nil {
					if _, waitErr := delOp.Wait(ctx); waitErr != nil {
						return fmt.Errorf("DeleteTrigger.Wait failed: %w", waitErr)
					}
				}
			}
		}
		if delChOp, delErr := client.DeleteChannel(ctx, &eventarcpb.DeleteChannelRequest{Name: channel.GetName()}); delErr == nil {
			if _, waitErr := delChOp.Wait(ctx); waitErr != nil {
				return fmt.Errorf("DeleteChannel.Wait failed: %w", waitErr)
			}
		}
		op, err = client.CreateChannel(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("CreateChannel failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created channel: %s\n", resp.GetName())
	return nil
}

// [END eventarc_v1_eventarc_channel_create]
