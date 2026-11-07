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

// [START clouddeploy_v1_clouddeploy_targets_list]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
	"google.golang.org/api/iterator"
)

// Use the ListTargets method.
func listTargets(ctx context.Context, w io.Writer, projectID string) error {
	locationName := "us-central1"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationName)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.ListTargetsRequest{
		Parent: parent,
	}

	it := client.ListTargets(ctx, req)
	for {
		target, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTargets failed: %w", err)
		}
		fmt.Fprintf(w, "Target: %s\n", target.GetName())
	}

	return nil
}

// [END clouddeploy_v1_clouddeploy_targets_list]
