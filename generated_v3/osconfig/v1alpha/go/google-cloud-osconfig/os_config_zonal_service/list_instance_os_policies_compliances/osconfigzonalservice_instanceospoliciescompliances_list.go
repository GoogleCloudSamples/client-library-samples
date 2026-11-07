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

// [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1alpha"
	osconfigpb "cloud.google.com/go/osconfig/apiv1alpha/osconfigpb"
	"google.golang.org/api/iterator"
)

// listInstanceOsPoliciesCompliances lists OS policy compliance data for Compute Engine instances in a zone.
func listInstanceOsPoliciesCompliances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := osconfig.NewOsConfigZonalClient(ctx)
	if err != nil {
		return fmt.Errorf("NewOsConfigZonalClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ListInstanceOSPoliciesCompliancesRequest{
		Parent: parent,
	}

	it := client.ListInstanceOSPoliciesCompliances(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate instance OS policies compliances: %w", err)
		}
		fmt.Fprintf(w, "Instance OS policies compliance: %s\n", resp.GetName())
	}

	return nil
}

// [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliances_list]
