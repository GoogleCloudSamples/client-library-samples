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

// [START geminidataanalytics_v1beta_datachatservice_conversations_list]

import (
	"context"
	"fmt"
	"io"

	geminidataanalytics "cloud.google.com/go/geminidataanalytics/apiv1beta"
	geminidataanalyticspb "cloud.google.com/go/geminidataanalytics/apiv1beta/geminidataanalyticspb"
	"google.golang.org/api/iterator"
)

// listConversations lists conversations in the specified project and location.
func listConversations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := geminidataanalytics.NewDataChatClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataChatClient failed: %w", err)
	}
	defer client.Close()

	req := &geminidataanalyticspb.ListConversationsRequest{
		Parent: parent,
	}

	it := client.ListConversations(ctx, req)
	var count int
	for {
		conversation, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate conversations: %w", err)
		}
		fmt.Fprintf(w, "Conversation: %s\n", conversation.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No conversations found.")
	}

	return nil
}

// [END geminidataanalytics_v1beta_datachatservice_conversations_list]
