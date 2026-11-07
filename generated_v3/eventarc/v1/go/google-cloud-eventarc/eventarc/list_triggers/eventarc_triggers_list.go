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

// [START eventarc_v1_eventarc_triggers_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/api/iterator"
)

// listTriggers lists Eventarc triggers in a given project and location.
func listTriggers(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("eventarc.NewClient: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.ListTriggersRequest{
		Parent: parent,
	}

	it := client.ListTriggers(ctx, req)
	for {
		trigger, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Trigger: %s\n", trigger.GetName())
	}

	return nil
}

// [END eventarc_v1_eventarc_triggers_list]
