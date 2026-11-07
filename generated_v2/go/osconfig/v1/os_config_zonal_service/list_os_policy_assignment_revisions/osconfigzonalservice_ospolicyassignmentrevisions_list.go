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

// [START osconfig_v1_osconfigzonalservice_ospolicyassignmentrevisions_list]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1"
	osconfigpb "cloud.google.com/go/osconfig/apiv1/osconfigpb"
	"google.golang.org/api/iterator"
)

// listOsPolicyAssignmentRevisions lists the revisions of an OS policy assignment.
func listOsPolicyAssignmentRevisions(ctx context.Context, w io.Writer, projectID string, locationID string, osPolicyAssignmentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/osPolicyAssignments/%s", projectID, locationID, osPolicyAssignmentID)

	client, err := osconfig.NewOsConfigZonalClient(ctx)
	if err != nil {
		return fmt.Errorf("NewOsConfigZonalClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ListOSPolicyAssignmentRevisionsRequest{
		Name: name,
	}

	it := client.ListOSPolicyAssignmentRevisions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve revision: %w", err)
		}

		fmt.Fprintf(w, "OS policy assignment revision: %s, revision ID: %s\n", resp.GetName(), resp.GetRevisionId())
	}

	return nil
}

// [END osconfig_v1_osconfigzonalservice_ospolicyassignmentrevisions_list]
