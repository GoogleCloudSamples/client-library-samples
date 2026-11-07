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

// [START eventarc_v1_eventarc_googlechannelconfig_update]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	"cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateGoogleChannelConfig updates a Google channel configuration.
func updateGoogleChannelConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	googleChannelConfig := &eventarcpb.GoogleChannelConfig{
		Name: fmt.Sprintf("projects/%s/locations/%s/googleChannelConfig", projectID, locationID),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("eventarc.NewClient: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.UpdateGoogleChannelConfigRequest{
		GoogleChannelConfig: googleChannelConfig,
		UpdateMask:          updateMask,
	}

	resp, err := client.UpdateGoogleChannelConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateGoogleChannelConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated Google channel config: %s\n", resp.GetName())
	return nil
}

// [END eventarc_v1_eventarc_googlechannelconfig_update]
