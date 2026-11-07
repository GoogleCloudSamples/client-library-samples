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

// [START storage_v2_storagecontrol_summarize_intelligence_findings]

import (
	"context"
	"errors"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
	"google.golang.org/api/iterator"
)

// summarizeIntelligenceFindings retrieves a summary of intelligence findings for a location.
func summarizeIntelligenceFindings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.SummarizeIntelligenceFindingsRequest{
		Parent: parent,
	}

	it := client.SummarizeIntelligenceFindings(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("SummarizeIntelligenceFindings.Next: %w", err)
		}
		count++
		fmt.Fprintf(w, "Finding: %v\n", resp)
	}

	fmt.Fprintf(w, "Retrieved %d intelligence finding(s) for %s.\n", count, parent)
	return nil
}

// [END storage_v2_storagecontrol_summarize_intelligence_findings]
