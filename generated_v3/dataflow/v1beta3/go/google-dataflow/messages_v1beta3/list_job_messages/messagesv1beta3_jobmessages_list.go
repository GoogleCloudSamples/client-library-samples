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

// [START dataflow_v1beta3_messagesv1beta3_jobmessages_list]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
	"google.golang.org/api/iterator"
)

// listJobMessages retrieves and prints messages for a Dataflow job.
func listJobMessages(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string) error {
	client, err := dataflow.NewMessagesV1Beta3Client(ctx)
	if err != nil {
		return fmt.Errorf("NewMessagesV1Beta3Client failed: %w", err)
	}
	defer client.Close()

	req := &dataflowpb.ListJobMessagesRequest{
		ProjectId: projectID,
		Location:  locationID,
		JobId:     jobID,
	}

	it := client.ListJobMessages(ctx, req)
	for {
		msg, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate job messages: %w", err)
		}
		fmt.Fprintf(w, "Message ID: %s, Importance: %s, Text: %s\n", msg.GetId(), msg.GetMessageImportance(), msg.GetMessageText())
	}

	return nil
}

// [END dataflow_v1beta3_messagesv1beta3_jobmessages_list]
