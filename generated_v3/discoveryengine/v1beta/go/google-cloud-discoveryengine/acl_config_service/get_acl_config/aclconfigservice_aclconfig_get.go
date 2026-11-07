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

// [START discoveryengine_v1beta_aclconfigservice_aclconfig_get]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// getAclConfig retrieves the ACL configuration for a project and location.
func getAclConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/aclConfig", projectID, locationID)

	client, err := discoveryengine.NewAclConfigClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAclConfigClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.GetAclConfigRequest{
		Name: name,
	}

	resp, err := client.GetAclConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAclConfig failed: %w", err)
	}

	fmt.Fprintf(w, "ACL config name: %s\n", resp.GetName())

	return nil
}

// [END discoveryengine_v1beta_aclconfigservice_aclconfig_get]
