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

// [START eventarc_v1_eventarc_trigger_delete]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
)

// deleteTrigger deletes an Eventarc trigger in the specified project and location.
func deleteTrigger(ctx context.Context, w io.Writer, projectID string, locationID string, triggerID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/triggers/%s", projectID, locationID, triggerID)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("eventarc.NewClient: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.DeleteTriggerRequest{
		Name: name,
	}

	op, err := client.DeleteTrigger(ctx, req)
	if err != nil {
		return fmt.Errorf("client.DeleteTrigger: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted trigger: %s\n", resp.GetName())
	return nil
}

// [END eventarc_v1_eventarc_trigger_delete]
