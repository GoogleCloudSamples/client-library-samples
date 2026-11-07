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

// [START cloudkms_v1_hsmmanagement_singletenanthsminstanceproposals_list]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
	"google.golang.org/api/iterator"
)

// listSingleTenantHsmInstanceProposals lists proposals for a single-tenant HSM instance.
func listSingleTenantHsmInstanceProposals(ctx context.Context, w io.Writer, projectID string, locationID string, singleTenantHsmInstanceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/singleTenantHsmInstances/%s", projectID, locationID, singleTenantHsmInstanceID)

	client, err := cloudkms.NewHsmManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHsmManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.ListSingleTenantHsmInstanceProposalsRequest{
		Parent: parent,
	}

	it := client.ListSingleTenantHsmInstanceProposals(ctx, req)
	var count int
	for {
		proposal, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate single-tenant HSM instance proposals: %w", err)
		}

		fmt.Fprintf(w, "Proposal: %s\n", proposal.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No single-tenant HSM instance proposals found.")
	}

	return nil
}

// [END cloudkms_v1_hsmmanagement_singletenanthsminstanceproposals_list]
