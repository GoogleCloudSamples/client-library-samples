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

// [START run_v2_revisions_revisions_list]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
	"google.golang.org/api/iterator"
)

// listRevisions lists revisions for a Cloud Run service.
func listRevisions(ctx context.Context, w io.Writer, projectID string, locationID string, serviceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/services/%s", projectID, locationID, serviceID)

	client, err := run.NewRevisionsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRevisionsClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.ListRevisionsRequest{
		Parent: parent,
	}

	it := client.ListRevisions(ctx, req)
	for {
		revision, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate revisions: %w", err)
		}
		fmt.Fprintf(w, "Revision: %s\n", revision.GetName())
	}

	return nil
}

// [END run_v2_revisions_revisions_list]
