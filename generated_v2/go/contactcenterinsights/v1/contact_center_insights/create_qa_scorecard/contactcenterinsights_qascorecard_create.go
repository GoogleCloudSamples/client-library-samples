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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_create]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// createQaScorecard creates a QA scorecard for evaluating conversations.
func createQaScorecard(ctx context.Context, w io.Writer, projectID string, locationID string, qaScorecardID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	qaScorecard := &contactcenterinsightspb.QaScorecard{
		DisplayName: "Customer Service Quality Scorecard",
		Description: "Scorecard evaluating customer service call quality.",
	}

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.CreateQaScorecardRequest{
		Parent:        parent,
		QaScorecardId: qaScorecardID,
		QaScorecard:   qaScorecard,
	}

	resp, err := client.CreateQaScorecard(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateQaScorecard failed: %w", err)
	}

	fmt.Fprintf(w, "Created QA scorecard: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
