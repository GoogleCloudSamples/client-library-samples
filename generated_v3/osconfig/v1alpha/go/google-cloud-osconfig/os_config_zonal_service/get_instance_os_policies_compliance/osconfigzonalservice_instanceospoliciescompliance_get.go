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

// [START osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliance_get]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1alpha"
	osconfigpb "cloud.google.com/go/osconfig/apiv1alpha/osconfigpb"
)

// getInstanceOsPoliciesCompliance retrieves compliance data for OS policies on a VM instance.
func getInstanceOsPoliciesCompliance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceOsPoliciesComplianceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instanceOSPoliciesCompliances/%s", projectID, locationID, instanceOsPoliciesComplianceID)

	client, err := osconfig.NewOsConfigZonalClient(ctx)
	if err != nil {
		return fmt.Errorf("NewOsConfigZonalClient: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.GetInstanceOSPoliciesComplianceRequest{
		Name: name,
	}

	resp, err := client.GetInstanceOSPoliciesCompliance(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInstanceOSPoliciesCompliance: %w", err)
	}

	fmt.Fprintf(w, "Retrieved instance OS policies compliance: %s\n", resp.GetName())
	return nil
}

// [END osconfig_v1alpha_osconfigzonalservice_instanceospoliciescompliance_get]
