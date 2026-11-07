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

// [START discoveryengine_v1_usereventservice_import_user_events]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// importUserEvents imports user events into a data store.
func importUserEvents(ctx context.Context, w io.Writer, projectID string, locationID string, dataStoreID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/dataStores/%s", projectID, locationID, dataStoreID)

	event := &discoveryenginepb.UserEvent{
		EventType:    "view-item",
		UserPseudoId: "example-user-pseudo-id",
		EventTime:    timestamppb.Now(),
		Documents: []*discoveryenginepb.DocumentInfo{
			{
				DocumentDescriptor: &discoveryenginepb.DocumentInfo_Id{
					Id: "example-document-id",
				},
			},
		},
	}

	inlineSource := &discoveryenginepb.ImportUserEventsRequest_InlineSource{
		UserEvents: []*discoveryenginepb.UserEvent{event},
	}

	client, err := discoveryengine.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ImportUserEventsRequest{
		Parent: parent,
		Source: &discoveryenginepb.ImportUserEventsRequest_InlineSource_{
			InlineSource: inlineSource,
		},
	}

	op, err := client.ImportUserEvents(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportUserEvents failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Imported user events. Joined events: %d, unjoined events: %d\n", resp.GetJoinedEventsCount(), resp.GetUnjoinedEventsCount())
	return nil
}

// [END discoveryengine_v1_usereventservice_import_user_events]
