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

// [START cloudbuild_v2_cloudbuild_workerpools_list]

import (
	"context"
	"fmt"
	"io"

	cloudbuild "cloud.google.com/go/cloudbuild/apiv1/v2"
	cloudbuildpb "cloud.google.com/go/cloudbuild/apiv1/v2/cloudbuildpb"
	"google.golang.org/api/iterator"
)

// listWorkerPools lists the Cloud Build worker pools in a given project and location.
func listWorkerPools(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := cloudbuild.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &cloudbuildpb.ListWorkerPoolsRequest{
		Parent: parent,
	}

	it := client.ListWorkerPools(ctx, req)
	for {
		pool, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}

		fmt.Fprintf(w, "Worker pool: %s\n", pool.GetName())
	}

	return nil
}

// [END cloudbuild_v2_cloudbuild_workerpools_list]
