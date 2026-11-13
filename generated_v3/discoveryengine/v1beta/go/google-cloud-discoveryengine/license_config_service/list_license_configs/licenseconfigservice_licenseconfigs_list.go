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

// [START discoveryengine_v1beta_licenseconfigservice_licenseconfigs_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/api/iterator"
)

// listLicenseConfigs lists license configurations in a location.
func listLicenseConfigs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := discoveryengine.NewLicenseConfigClient(ctx)
	if err != nil {
		return fmt.Errorf("NewLicenseConfigClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ListLicenseConfigsRequest{
		Parent: parent,
	}

	it := client.ListLicenseConfigs(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListLicenseConfigs failed: %w", err)
		}
		fmt.Fprintf(w, "License Config: %s\n", resp.GetName())
		count++
	}
	if count == 0 {
		fmt.Fprintln(w, "No license configs found.")
	}

	return nil
}

// [END discoveryengine_v1beta_licenseconfigservice_licenseconfigs_list]
