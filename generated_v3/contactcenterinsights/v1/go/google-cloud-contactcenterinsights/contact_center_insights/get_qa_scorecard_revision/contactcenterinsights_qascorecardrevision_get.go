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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecardrevision_get]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// getQaScorecardRevision retrieves a specific QA scorecard revision.
func getQaScorecardRevision(ctx context.Context, w io.Writer, projectID string, locationID string, qaScorecardID string, qaScorecardRevisionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/qaScorecards/%s/revisions/%s", projectID, locationID, qaScorecardID, qaScorecardRevisionID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.GetQaScorecardRevisionRequest{
		Name: name,
	}

	resp, err := client.GetQaScorecardRevision(ctx, req)
	if err != nil {
		return fmt.Errorf("GetQaScorecardRevision: %w", err)
	}

	fmt.Fprintf(w, "Retrieved QA scorecard revision: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_qascorecardrevision_get]
