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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_get]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// Use the GetQaScorecard method.
func getQaScorecard(ctx context.Context, w io.Writer, projectID string, locationID string, qaScorecardID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/qaScorecards/%s", projectID, locationID, qaScorecardID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.GetQaScorecardRequest{
		Name: name,
	}

	resp, err := client.GetQaScorecard(ctx, req)
	if err != nil {
		return fmt.Errorf("GetQaScorecard: %w", err)
	}

	fmt.Fprintf(w, "Retrieved QA scorecard: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_get]
