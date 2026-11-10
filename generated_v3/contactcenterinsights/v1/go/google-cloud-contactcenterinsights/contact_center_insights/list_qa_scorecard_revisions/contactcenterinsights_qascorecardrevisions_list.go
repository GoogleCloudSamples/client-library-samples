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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecardrevisions_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
	"google.golang.org/api/iterator"
)

// listQaScorecardRevisions lists revisions of a QA scorecard.
func listQaScorecardRevisions(ctx context.Context, w io.Writer, projectID string, locationID string, qaScorecardID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/qaScorecards/%s", projectID, locationID, qaScorecardID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.ListQaScorecardRevisionsRequest{
		Parent: parent,
	}

	it := client.ListQaScorecardRevisions(ctx, req)
	for {
		revision, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListQaScorecardRevisions: %w", err)
		}
		fmt.Fprintf(w, "Revision: %s\n", revision.GetName())
	}

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_qascorecardrevisions_list]
