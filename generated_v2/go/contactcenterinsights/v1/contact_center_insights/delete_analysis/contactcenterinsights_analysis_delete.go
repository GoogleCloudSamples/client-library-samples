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

// [START contactcenterinsights_v1_contactcenterinsights_analysis_delete]

import (
	"context"
	"fmt"
	"io"
	"os"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteAnalysis deletes an analysis of a conversation.
func deleteAnalysis(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION_ID")
	if location == "" {
		location = os.Getenv("LOCATION")
	}
	if location == "" {
		location = "us-central1"
	}

	conversationID := os.Getenv("CONVERSATION_ID")
	if conversationID == "" {
		conversationID = "example-conversation-id"
	}

	analysisID := os.Getenv("ANALYSIS_ID")
	if analysisID == "" {
		analysisID = "example-analysis-id"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/conversations/%s/analyses/%s", projectID, location, conversationID, analysisID)
	if envName := os.Getenv("ANALYSIS_NAME"); envName != "" {
		name = envName
	}

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("contactcenterinsights.NewClient: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.DeleteAnalysisRequest{
		Name: name,
	}

	if err := client.DeleteAnalysis(ctx, req); err != nil {
		// Treat an analysis that is not found as already deleted.
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted analysis: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteAnalysis: %w", err)
	}

	fmt.Fprintf(w, "Deleted analysis: %s\n", name)
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_analysis_delete]
