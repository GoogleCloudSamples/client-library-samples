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

// [START osconfig_v1beta_osconfigservice_patchjobinstancedetails_list]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1beta"
	osconfigpb "cloud.google.com/go/osconfig/apiv1beta/osconfigpb"
	"google.golang.org/api/iterator"
)

// listPatchJobInstanceDetails lists instances associated with a patch job.
func listPatchJobInstanceDetails(ctx context.Context, w io.Writer, projectID string, patchJobID string) error {
	parent := fmt.Sprintf("projects/%s/patchJobs/%s", projectID, patchJobID)

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ListPatchJobInstanceDetailsRequest{
		Parent: parent,
	}

	it := client.ListPatchJobInstanceDetails(ctx, req)
	for {
		instanceDetail, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListPatchJobInstanceDetails failed: %w", err)
		}
		fmt.Fprintf(w, "Instance: %s\n", instanceDetail.GetName())
	}

	return nil
}

// [END osconfig_v1beta_osconfigservice_patchjobinstancedetails_list]
