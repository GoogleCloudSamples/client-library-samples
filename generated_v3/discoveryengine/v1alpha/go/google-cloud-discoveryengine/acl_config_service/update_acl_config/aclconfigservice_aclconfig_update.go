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

// [START discoveryengine_v1alpha_aclconfigservice_aclconfig_update]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// updateAclConfig updates the ACL configuration for a project and location.
func updateAclConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	client, err := discoveryengine.NewAclConfigClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAclConfigClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/aclConfig", projectID, locationID)

	// Perform a read-modify-write because UpdateAclConfig requires the full resource.
	aclConfig, err := client.GetAclConfig(ctx, &discoveryenginepb.GetAclConfigRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("GetAclConfig: %w", err)
	}

	// Mutate the identity provider configuration.
	if aclConfig.IdpConfig == nil {
		aclConfig.IdpConfig = &discoveryenginepb.IdpConfig{}
	}
	aclConfig.IdpConfig.IdpType = discoveryenginepb.IdpConfig_GSUITE

	req := &discoveryenginepb.UpdateAclConfigRequest{
		AclConfig: aclConfig,
	}

	response, err := client.UpdateAclConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAclConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated ACL configuration: %s\n", response.GetName())
	return nil
}

// [END discoveryengine_v1alpha_aclconfigservice_aclconfig_update]
