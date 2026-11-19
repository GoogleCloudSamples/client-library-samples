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

// [START eventarc_v1_eventarc_channel_update]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateChannel updates an existing Eventarc channel's labels.
func updateChannel(ctx context.Context, w io.Writer, projectID string, locationID string, channelID string) error {
	channel := &eventarcpb.Channel{
		Name: fmt.Sprintf("projects/%s/locations/%s/channels/%s", projectID, locationID, channelID),
		Labels: map[string]string{
			"env": "prod",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.UpdateChannelRequest{
		Channel:    channel,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateChannel(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateChannel failed: %w", err)
	}

	updatedChannel, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated channel: %s\n", updatedChannel.GetName())
	return nil
}

// [END eventarc_v1_eventarc_channel_update]
