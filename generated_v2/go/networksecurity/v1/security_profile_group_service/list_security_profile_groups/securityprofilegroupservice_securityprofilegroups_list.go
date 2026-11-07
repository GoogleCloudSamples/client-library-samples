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

// [START networksecurity_v1_securityprofilegroupservice_securityprofilegroups_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
	"google.golang.org/api/iterator"
)

// listSecurityProfileGroups lists security profile groups for a project or organization.
func listSecurityProfileGroups(ctx context.Context, w io.Writer, projectsOrganizationID string, locationID string) error {
	// Security profile groups are supported only in the global location.
	if locationID != "global" {
		locationID = "global"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectsOrganizationID, locationID)
	if strings.Contains(projectsOrganizationID, "/") {
		parent = fmt.Sprintf("%s/locations/%s", projectsOrganizationID, locationID)
	}

	client, err := networksecurity.NewSecurityProfileGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSecurityProfileGroupClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.ListSecurityProfileGroupsRequest{
		Parent: parent,
	}

	it := client.ListSecurityProfileGroups(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Security Profile Group: %s\n", resp.GetName())
	}

	return nil
}

// [END networksecurity_v1_securityprofilegroupservice_securityprofilegroups_list]
