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

// [START licensemanager_v1_licensemanager_configurations_list]

import (
	"context"
	"fmt"
	"io"

	licensemanager "cloud.google.com/go/licensemanager/apiv1"
	licensemanagerpb "cloud.google.com/go/licensemanager/apiv1/licensemanagerpb"
	"google.golang.org/api/iterator"
)

// listConfigurations lists license configurations in the specified project and location.
func listConfigurations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := licensemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &licensemanagerpb.ListConfigurationsRequest{
		Parent: parent,
	}

	it := client.ListConfigurations(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate configurations: %w", err)
		}
		fmt.Fprintf(w, "Configuration: %s\n", resp.GetName())
	}

	return nil
}

// [END licensemanager_v1_licensemanager_configurations_list]
