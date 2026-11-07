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

// [START discoveryengine_v1alpha_usereventservice_purge_user_events]

import (
	"context"
	"fmt"
	"io"
	"time"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// purgeUserEvents deletes user events matching the filter criteria.
func purgeUserEvents(ctx context.Context, w io.Writer, projectID string, locationID string, dataStoreID string) error {
	now := time.Now().UTC()
	// Purge filters require space-delimited conditions without logical operators (AND/OR).
	filter := fmt.Sprintf(`eventTime>"%s" eventTime<"%s" eventType="search"`,
		now.Add(-24*time.Hour).Format(time.RFC3339),
		now.Format(time.RFC3339))
	parent := fmt.Sprintf("projects/%s/locations/%s/dataStores/%s", projectID, locationID, dataStoreID)

	client, err := discoveryengine.NewUserEventClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserEventClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.PurgeUserEventsRequest{
		Parent: parent,
		Filter: filter,
		Force:  true,
	}

	op, err := client.PurgeUserEvents(ctx, req)
	if err != nil {
		return fmt.Errorf("PurgeUserEvents: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Purged %d user events\n", resp.GetPurgeCount())

	return nil
}

// [END discoveryengine_v1alpha_usereventservice_purge_user_events]
